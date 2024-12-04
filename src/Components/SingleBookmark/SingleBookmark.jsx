import { Link, useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../Contexts/BookmarksContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { useHotels } from "../../Contexts/HotelsContext";
import { SearchItem } from "../Hotels/Hotels";

let filteredHotels = [];

function SingleBookmark() {
  const { id } = useParams();
  
  const { currentBookmark, getSingleBookmark, isLoading } = useBookmarks();
  const { hotels, currentHotel } = useHotels();

  const navigate = useNavigate();

  useEffect(() => {
    getSingleBookmark(id);
  }, [id]);

  useEffect(() => {
    filteredHotels = hotels.filter(
      (item) => item.country === currentBookmark.country
    );
  }, [currentBookmark, hotels]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        <HiChevronDoubleLeft /> Back
      </button>

      <h2>{currentBookmark.cityName}</h2>
      <span>{currentBookmark.country}</span>

      <div className="bookmarks-list">
        {filteredHotels.length === 0 ? (
          <span
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "var(--text-500)",
              marginTop: "2rem",
            }}
          >
            There is any hotel in this country!
          </span>
        ) : (
          filteredHotels.map((item) => (
            <Link
              key={item.id}
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <SearchItem currentHotel={currentHotel} item={item} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default SingleBookmark;
