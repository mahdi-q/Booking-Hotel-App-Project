import { Toaster } from "react-hot-toast";
import "./App.css";
import LocationList from "./Components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import HotelLayout from "./Components/HotelLayout/HotelLayout";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import { HotelsProvider } from "./Contexts/HotelsContext";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import BookmarkLayout from "./Components/BookmarkLayout/BookmarkLayout";
import { BookmarksProvider } from "./Contexts/BookmarksContext";
import Bookmarks from "./Components/Bookmarks/Bookmarks";
import SingleBookmark from "./Components/SingleBookmark/SingleBookmark";

function App() {
  return (
    <HotelsProvider>
      <BookmarksProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LocationList />} />

            <Route path="/hotels" element={<HotelLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>

            <Route path="/bookmarks" element={<BookmarkLayout />}>
              <Route index element={<Bookmarks />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<div>Add New Bookmark</div>} />
            </Route>
          </Route>
        </Routes>
      </BookmarksProvider>
    </HotelsProvider>
  );
}

export default App;
