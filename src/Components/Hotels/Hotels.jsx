import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../Contexts/HotelsContext";

function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotels();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="search-list">
      <h2>Search Result : ({hotels.length})</h2>

      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <SearchItem currentHotel={currentHotel} item={item} />
        </Link>
      ))}
    </div>
  );
}

export default Hotels;

export function SearchItem({ item, currentHotel }) {
  return (
    <div
      className={`search__item ${
        item.id === currentHotel?.id ? "current-hotel" : ""
      }`}
    >
      <img className="search-item__image" src={item.xl_picture_url} alt={item.name} />

      <div className="search-item__desc">
        <p className="location">{item.smart_location}</p>
        <p className="name">{item.name}</p>
        <p className="price">
          €&nbsp;{item.price}&nbsp;<span>night</span>
        </p>
      </div>
    </div>
  );
}
