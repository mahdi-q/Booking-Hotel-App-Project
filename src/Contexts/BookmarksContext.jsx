import { createContext, useContext, useState } from "react";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarksContext = createContext([]);

const Base_Url = "http://localhost:5000/bookmarks";

export function BookmarksProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  const { data: bookmarks, isLoading } = useFetch(Base_Url, "");

  async function getSingleBookmark(id) {
    try {
      setIsLoadingCurrBookmark(true);
      const { data } = await axios.get(`${Base_Url}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        isLoadingCurrBookmark,
        getSingleBookmark,
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
