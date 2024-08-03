import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option")).room;

  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `host_location_like=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="searchList">
      <h2>Search Result : ({data.length})</h2>

      {data.map((item) => (
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
