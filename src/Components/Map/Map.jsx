import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../../Hooks/useGeoLocation";
import useLocationUrl from "../../Hooks/useLocationUrl";
import toast from "react-hot-toast";

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([
    51.50548368506733, -0.12634277343750003,
  ]);

  const [lat, lng] = useLocationUrl();

  const {
    isLoading: isLoadingPosition,
    position,
    error,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (error) toast.error(error);

    if (position?.lat && position?.lng)
      setMapCenter([position.lat, position.lng]);
  }, [position, error]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="getLocation">
          {isLoadingPosition ? "Loading ..." : "Use Your Location"}
        </button>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        <DetectClick />

        <ChangeCenter position={mapCenter} />

        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  map.setZoom(10)
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      if (e.originalEvent.srcElement.className !== "getLocation") {
        navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }
    },
  });

  return null;
}
