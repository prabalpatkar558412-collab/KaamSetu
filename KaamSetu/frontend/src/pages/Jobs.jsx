import { useEffect, useState } from "react";
import API from "../services/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default function Jobs() {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [workerSkills, setWorkerSkills] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const skills =
      user?.skills?.map((skill) =>
        skill.toLowerCase().trim()
      ) || [];

    setWorkerSkills(skills);
    getUserLocation(skills);
  }, []);

  const getUserLocation = (skills) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserLocation(location);
        fetchJobs(skills, location);
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  const fetchJobs = async (skills, location) => {
    try {
      const { data } = await API.get("/jobs/available");

      const matchedJobs = data.filter((job) => {
        const jobSkills =
          job.skillsRequired?.map((skill) =>
            skill.toLowerCase().trim()
          ) || [];

        return jobSkills.some((skill) =>
          skills.some(
            (workerSkill) => workerSkill === skill
          )
        );
      });

      const sortedJobs = matchedJobs.sort((a, b) => {
        const distanceA = calculateDistance(
          location[0],
          location[1],
          a.location.lat,
          a.location.lng
        );

        const distanceB = calculateDistance(
          location[0],
          location[1],
          b.location.lat,
          b.location.lng
        );

        return distanceA - distanceB;
      });

      setFilteredJobs(sortedJobs);
      setSelectedJob(sortedJobs[0] || null);
    } catch (error) {
      console.log(error);
    }
  };

  const getDistance = (job) => {
    return calculateDistance(
      userLocation[0],
      userLocation[1],
      job.location.lat,
      job.location.lng
    ).toFixed(1);
  };

  const getETA = (job) => {
    return Math.ceil((getDistance(job) / 20) * 60);
  };

  const acceptJob = async (job) => {
    try {
      await API.put(`/jobs/book/${job._id}`);

      localStorage.setItem(
        "activeJob",
        JSON.stringify(job)
      );

      alert("Job Accepted Successfully");

      window.location.href = "/job-tracking";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  if (!userLocation) {
    return (
      <div className="p-10 text-2xl">
        Getting your location...
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative bg-gradient-to-br from-blue-100 via-white to-green-100 overflow-hidden">
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CircleMarker
          center={userLocation}
          radius={22}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#2563eb",
            fillOpacity: 0.18,
          }}
        />

        <Marker position={userLocation} icon={workerIcon}>
          <Popup>
            <b>👷 Your Location</b>
          </Popup>
        </Marker>

        {filteredJobs.map((job) => (
          <div key={job._id}>
            <CircleMarker
              center={[
                job.location.lat,
                job.location.lng,
              ]}
              radius={
                selectedJob?._id === job._id ? 24 : 14
              }
              pathOptions={{
                color: getJobColor(job),
                fillColor: getJobColor(job),
                fillOpacity:
                  selectedJob?._id === job._id ? 0.25 : 0.12,
              }}
            />

            <Marker
              position={[
                job.location.lat,
                job.location.lng,
              ]}
              icon={getJobIcon(job)}
              eventHandlers={{
                click: () => setSelectedJob(job),
              }}
            >
              <Popup>
                <b>{job.title}</b>
                <br />
                Skill:{" "}
                {job.skillsRequired?.join(", ") ||
                  "General"}
                <br />
                ₹{job.salary}
                <br />
                {getDistance(job)} km away
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>

      <div className="absolute top-24 left-4 z-[1000] backdrop-blur-xl bg-white/75 border border-white/40 p-5 rounded-3xl shadow-2xl">
        <h2 className="font-bold text-xl">
          Skill Based Jobs
        </h2>

        <p>
          Your Skills:{" "}
          {workerSkills.length > 0
            ? workerSkills.join(", ")
            : "Not selected"}
        </p>

        <p className="text-green-600 font-bold">
          Matching Jobs: {filteredJobs.length}
        </p>

        <div className="mt-3 text-sm space-y-1">
          <p>👷 Blue = You</p>
          <p>🔧 Green = Plumber</p>
          <p>⚡ Yellow = Electrician</p>
          <p>🎨 Purple = Painter</p>
          <p>🪚 Orange = Carpenter</p>
        </div>
      </div>

      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 90,
        }}
        className="absolute bottom-0 left-0 right-0 z-[1000] backdrop-blur-2xl bg-white/80 rounded-t-[40px] shadow-2xl p-5 max-h-[45vh] overflow-y-auto border-t border-white/40"
      >
        <h2 className="text-2xl font-bold mb-4">
          Nearest Jobs
        </h2>

        {selectedJob ? (
          <div className="border rounded-2xl p-4 mb-4 bg-gray-50">
            <h3 className="text-xl font-bold">
              {selectedJob.title}
            </h3>

            <p className="text-gray-600 mt-1">
              {selectedJob.description}
            </p>

            <p className="mt-2">
              📍 {selectedJob.location.address}
            </p>

            <p className="mt-2 font-semibold text-gray-700">
              Skill:{" "}
              {selectedJob.skillsRequired?.join(", ") ||
                "General"}
            </p>

            <div className="flex gap-4 mt-3 font-bold">
              <span className="text-green-600">
                ₹{selectedJob.salary}
              </span>

              <span className="text-blue-600">
                {getDistance(selectedJob)} km
              </span>

              <span className="text-orange-600">
                ETA {getETA(selectedJob)} min
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => acceptJob(selectedJob)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
              >
                Accept Job
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${selectedJob.location.lat},${selectedJob.location.lng}`,
                    "_blank"
                  )
                }
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
              >
                Navigate
              </button>
            </div>
          </div>
        ) : (
          <p>No matching jobs found</p>
        )}

        <div className="space-y-3">
          {filteredJobs.slice(0, 10).map((job) => (
            <motion.button
              key={job._id}
              onClick={() => setSelectedJob(job)}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={`w-full text-left border p-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg transition ${
                selectedJob?._id === job._id
                  ? "ring-4 ring-blue-300"
                  : ""
              }`}
            >
              <div className="font-bold">
                {job.title}
              </div>

              <div className="text-sm text-gray-600">
                {getDistance(job)} km • ETA{" "}
                {getETA(job)} min • ₹{job.salary}
              </div>

              <div className="text-xs text-gray-500 mt-1">
                {job.skillsRequired?.join(", ") ||
                  "General"}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}