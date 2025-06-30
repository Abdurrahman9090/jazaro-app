"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { UserOutlined } from "@ant-design/icons";

// Fix default icon issue in Leaflet
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

export default function LeafletMap({ userLocation, fixers }: {
  userLocation: { lat: number; lng: number };
  fixers: { id: string; name: string; offer: string; distance: string; lat: number; lng: number }[];
}) {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={14}
      style={{ width: "100%", height: "190px" }}
      scrollWheelZoom={false}
      dragging={true}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>You are here</Popup>
      </Marker>
      {fixers.map((fixer) => (
        <Marker key={fixer.id} position={[fixer.lat, fixer.lng]}>
          <Popup>
            <div>
              <b>{fixer.name}</b>
              <br />
              {fixer.offer}
              <br />
              {fixer.distance} away
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 