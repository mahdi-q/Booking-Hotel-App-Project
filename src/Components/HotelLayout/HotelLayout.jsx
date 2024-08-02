import { Outlet } from "react-router-dom";

function HotelLayout() {
  return (
    <div className="hotelLayout">
      <div className="sidebar">
        sidebar
        <Outlet />
      </div>
      <div className="mapContainer">map</div>
    </div>
  );
}

export default HotelLayout;
