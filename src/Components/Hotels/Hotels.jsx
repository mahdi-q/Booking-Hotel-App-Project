import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../Contexts/HotelsContext";

function Hotels() {
  const { hotels, isLoading } = useHotels();

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
          <SearchItem item={item} />
        </Link>
      ))}
    </div>
  );
}

export default Hotels;

function SearchItem({ item }) {
  return (
    <div className="searchItem">
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
