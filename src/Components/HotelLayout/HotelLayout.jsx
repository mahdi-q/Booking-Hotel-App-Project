import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function HotelLayout() {
  return (
    <div className="hotelLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}

export default HotelLayout;
