import { useEffect, useState } from "react";
import API from "../services/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

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

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

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
          skills.some((workerSkill) => workerSkill === skill)
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

      localStorage.setItem("activeJob", JSON.stringify(job));

      alert("Job Accepted Successfully");

      window.location.href = "/job-tracking";
    } catch (error) {
      alert(error.response?.data?.message || "Booking Failed");
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

        <Marker position={userLocation}>
          <Popup>Your Location</Popup>
        </Marker>

        {filteredJobs.map((job) => (
          <Marker
            key={job._id}
            position={[job.location.lat, job.location.lng]}
            eventHandlers={{
              click: () => setSelectedJob(job),
            }}
          >
            <Popup>
              <b>{job.title}</b>
              <br />
              ₹{job.salary}
              <br />
              {getDistance(job)} km away
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-24 left-4 z-[1000] backdrop-blur-xl bg-white/70 border border-white/40 p-5 rounded-3xl shadow-2xl">
        <h2 className="font-bold text-xl">Skill Based Jobs</h2>
        <p>Your Skills: {workerSkills.join(", ")}</p>
        <p className="text-green-600 font-bold">
          Matching Jobs: {filteredJobs.length}
        </p>
      </div>

      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 90 }}
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
              className="w-full text-left border p-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg transition"
            >
              <div className="font-bold">
                {job.title}
              </div>

              <div className="text-sm text-gray-600">
                {getDistance(job)} km • ETA {getETA(job)} min • ₹
                {job.salary}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}