import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../Hooks/useGeoLocation";

function Map({ markerLocations }) {
  const [searchParams] = useSearchParams();
  const [mapCenter, setMapCenter] = useState([
    51.50548368506733, -0.12634277343750003,
  ]);

  const {
    isLoading: isLoadingPosition,
    position,
    error,
    getPosition,
  } = useGeoLocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (error) throw new Error(error);

    if (position?.lat && position?.lng)
      setMapCenter([position.lat, position.lng]);
  }, [position, error]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
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
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
