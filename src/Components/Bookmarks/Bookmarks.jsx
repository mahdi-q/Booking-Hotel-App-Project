import { HiTrash } from "react-icons/hi";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../../Contexts/BookmarksContext";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark } = useBookmarks();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link key={item.id} to={`/bookmarks/${item.id}`}>
              <BookmarkItem item={item} currentBookmark={currentBookmark} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;

function BookmarkItem({ item, currentBookmark }) {
  return (
    <div
      className={`bookmarkItem ${
        item.id === currentBookmark?.id ? "current-bookmark" : ""
      }`}
    >
      <div>
        <ReactCountryFlag svg countryCode={item.countryCode} />
        &nbsp; <strong>{item.cityName}</strong> &nbsp;
        <span>{item.country}</span>
      </div>
      <HiTrash className="trash" />
    </div>
  );
}
