import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../Contexts/HotelsContext";

function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotels();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="searchList">
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

function SearchItem({ item, currentHotel }) {
  return (
    <div
      className={`searchItem ${
        item.id === currentHotel?.id ? "currentHotel" : ""
      }`}
    >
      <img src={item.xl_picture_url} alt={item.name} />

      <div className="searchItemDesc">
        <p className="location">{item.smart_location}</p>
        <p className="name">{item.name}</p>
        <p className="price">
          €&nbsp;{item.price}&nbsp;<span>night</span>
        </p>
      </div>
    </div>
  );
}
