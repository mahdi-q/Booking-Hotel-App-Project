import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmarks } from "../../Contexts/BookmarksContext";

function BookmarkLayout() {
  const { bookmarks } = useBookmarks();

  return (
    <div className="bookmarkLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
