import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../../Contexts/HotelsContext";

function HotelLayout() {
  const { hotels } = useHotels();

  return (
    <div className="hotel-layout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={hotels} />
    </div>
  );
}

export default HotelLayout;
