import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader/Loader";

function LocationList() {
  const { data, isLoading } = useFetch(
    "https://booking-hotel-app-api-eight.vercel.app/hotels",
    ""
  );

  return (
    <div className="nearby-locations">
      <h2 className="locations__heading">Nearby Location</h2>

      {isLoading && <Loader />}

      <div className="locations__list">
        {data.map((item) => {
          return <LocationItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default LocationList;

function LocationItem({ item }) {
  return (
    <div className="locations__item">
      <img
        className="locations-item__image"
        src={item.xl_picture_url}
        alt={item.name}
      />

      <Link
        to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
      >
        <div className="locations-item__desc">
          <p className="location">{item.smart_location}</p>
          <p className="name">{item.name}</p>
          <p className="price">
            €&nbsp;{item.price}&nbsp;<span>night</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
