import { HiTrash } from "react-icons/hi";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../../Contexts/BookmarksContext";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmarks();

  if (isLoading) return <Loader />;

  if (!bookmarks.length)
    return (
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "var(--text-500)",
          marginTop:"2rem"
        }}
      >
        There is no bookmarked location
      </div>
    );

  return (
    <div>
      <h2>Bookmark List</h2>

      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/bookmarks/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <BookmarkItem
                item={item}
                currentBookmark={currentBookmark}
                deleteBookmark={deleteBookmark}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;

function BookmarkItem({ item, currentBookmark, deleteBookmark }) {
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteBookmark(id);
  };

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
      <button onClick={(e) => handleDelete(e, item.id)}>
        <HiTrash className="trash" />
      </button>
    </div>
  );
}
