import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

// Ensure to set up the marker icon properly
delete L.Icon.Default.prototype._getIconUrl; // Remove default icon URLs
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapComponent = ({ latlng }) => {
  const position = [latlng[0], latlng[1]]; // Example Latitude and Longitude for your location

  return (
    <MapContainer
      className="items-center"
      center={position}
      scrollWheelZoom={false}
      zoom={10}
      style={{
        height: "100%",
        width: "100%",
        zIndex: 0,
        alignItems: "center",
      }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} />
    </MapContainer>
  );
};

export default MapComponent;
