import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext([]);

const Base_Url = "https://booking-hotel-app-api-eight.vercel.app/bookmarks";

const Initial_State = {
  bookmarks: [],
  currentBookmark: {},
  error: "",
  isLoading: false,
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: action.payload,
        isLoading: false,
      };

    case "bookmark/loaded":
      return {
        ...state,
        currentBookmark: action.payload,
        isLoading: false,
      };

    case "bookmark/created":
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
        isLoading: false,
      };

    case "bookmark/deleted":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        isLoading: false,
      };

    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      throw new Error("Unknown action");
  }
}

export function BookmarksProvider({ children }) {
  const [{ bookmarks, currentBookmark, error, isLoading }, dispatch] =
    useReducer(bookmarkReducer, Initial_State);

  useEffect(() => {
    async function getBookmarks() {
      try {
        dispatch({ type: "loading" });
        const { data } = await axios.get(`${Base_Url}`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error?.message);
        dispatch({ type: "rejected", payload: error?.message });
      }
    }

    getBookmarks();
  }, []);

  async function getSingleBookmark(id) {
    if (currentBookmark?.id === Number(id)) return;

    try {
      dispatch({ type: "loading" });
      const { data } = await axios.get(`${Base_Url}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error?.message });
    }
  }

  async function createBookmark(newBookmark) {
    try {
      dispatch({ type: "loading" });
      const { data } = await axios.post(Base_Url, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error?.message });
    }
  }

  async function deleteBookmark(id) {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`${Base_Url}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error?.message });
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        currentBookmark,
        error,
        isLoading,
        getSingleBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined)
    throw new Error("BookmarksContext was used outside of BookmarksProvider.");
  return context;
};
