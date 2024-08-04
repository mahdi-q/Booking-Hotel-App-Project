import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../../Contexts/HotelsContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../Hooks/useGeoLocation";

function Map() {
  const [searchParams] = useSearchParams();
  const { hotels, isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState([50, 3]);

  const {
    isLoading: isLoadingPosition,
    position,
    error,
    getPosition,
  } = useGeoLocation();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (hotels[0] && !lat && !lng)
      setMapCenter([hotels[0].latitude, hotels[0].longitude]);
  }, [hotels]);

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (error) throw new Error(error);

    if (position?.lat && position?.lng)
      setMapCenter([position.lat, position.lng]);
  }, [position, error]);

  if (isLoading) return null;

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

        <ChangeCenter position={mapCenter} />

        {hotels.map((item) => (
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
