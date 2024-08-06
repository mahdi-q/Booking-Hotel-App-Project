import { Outlet } from "react-router-dom";
import Map from "../Map/Map";

function BookmarkLayout() {

  return (
    <div className="bookmarkLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={[]}/>
    </div>
  );
}

export default BookmarkLayout;
