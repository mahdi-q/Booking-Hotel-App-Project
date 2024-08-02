import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader/Loader";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>

      {isLoading && <Loader />}

      <div className="locationList">
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
    <div className="locationItem">
      <img src={item.xl_picture_url} alt={item.name} />
      
      <div className="locationItemDesc">
        <p className="location">{item.smart_location}</p>
        <p className="name">{item.name}</p>
        <p className="price">
          €&nbsp;{item.price}&nbsp;<span>night</span>
        </p>
      </div>
    </div>
  );
}
