import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const createMarkerIcon = (color, label) => {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 34px;
        height: 34px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 6px 18px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: 900;
        ">
          ${label}
        </div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
};

const workerIcon = createMarkerIcon("#2563eb", "👷");
const plumberIcon = createMarkerIcon("#16a34a", "🔧");
const electricianIcon = createMarkerIcon("#f59e0b", "⚡");
const painterIcon = createMarkerIcon("#9333ea", "🎨");
const carpenterIcon = createMarkerIcon("#ea580c", "🪚");
const defaultJobIcon = createMarkerIcon("#ef4444", "📍");

const getJobIcon = (job) => {
  const skills =
    job.skillsRequired?.join(" ").toLowerCase() || "";

  if (skills.includes("plumber")) return plumberIcon;
  if (skills.includes("electrician")) return electricianIcon;
  if (skills.includes("painter")) return painterIcon;
  if (skills.includes("carpenter")) return carpenterIcon;

  return defaultJobIcon;
};

const getJobColor = (job) => {
  const skills =
    job.skillsRequired?.join(" ").toLowerCase() || "";

  if (skills.includes("plumber")) return "#16a34a";
  if (skills.includes("electrician")) return "#f59e0b";
  if (skills.includes("painter")) return "#9333ea";
  if (skills.includes("carpenter")) return "#ea580c";

  return "#ef4444";
};

export default function LiveMap({ job }) {
  const [workerLocation, setWorkerLocation] =
    useState(null);

  useEffect(() => {
    if (!job?._id) return;

    socket.emit("join_job", job._id);

    socket.on("location_update", (data) => {
      setWorkerLocation([data.lat, data.lng]);
    });

    return () => {
      socket.off("location_update");
    };
  }, [job]);

  return (
    <MapContainer
      center={[
        job.location.lat,
        job.location.lng,
      ]}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "24px",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Job Glow */}
      <CircleMarker
        center={[
          job.location.lat,
          job.location.lng,
        ]}
        radius={24}
        pathOptions={{
          color: getJobColor(job),
          fillColor: getJobColor(job),
          fillOpacity: 0.22,
        }}
      />

      {/* Job Location */}
      <Marker
        position={[
          job.location.lat,
          job.location.lng,
        ]}
        icon={getJobIcon(job)}
      >
        <Popup>
          <b>{job.title}</b>
          <br />
          📍 {job.location.address}
          <br />
          Skill:{" "}
          {job.skillsRequired?.join(", ") || "General"}
          <br />
          ₹ {job.salary}
        </Popup>
      </Marker>

      {/* Live Worker */}
      {workerLocation && (
        <>
          <CircleMarker
            center={workerLocation}
            radius={22}
            pathOptions={{
              color: "#2563eb",
              fillColor: "#2563eb",
              fillOpacity: 0.18,
            }}
          />

          <Marker
            position={workerLocation}
            icon={workerIcon}
          >
            <Popup>
              <b>👷 Worker Live Location</b>
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}