import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import LiveMap from "../components/LiveMap";

export default function ContractorDashboard() {
  const [jobs, setJobs] = useState([]);
  const [onlineWorkers, setOnlineWorkers] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchOnlineWorkers();

    const interval = setInterval(() => {
      fetchJobs();
      fetchOnlineWorkers();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get("/jobs");
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOnlineWorkers = async () => {
    try {
      const { data } = await API.get("/auth/online-workers");
      setOnlineWorkers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-orange-100 p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
        Contractor Dashboard
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

        <span className="font-bold text-green-700 text-lg">
          Live Monitoring Active
        </span>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold">Total Jobs</h2>
          <p className="text-4xl mt-4">{jobs.length}</p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold">Accepted Jobs</h2>
          <p className="text-4xl mt-4">
            {jobs.filter((job) => job.status === "accepted").length}
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold">Completed Jobs</h2>
          <p className="text-4xl mt-4">
            {jobs.filter((job) => job.status === "completed").length}
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-6 rounded-3xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold">Online Workers</h2>
          <p className="text-4xl mt-4">{onlineWorkers.length}</p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>

            <p className="mb-3">{job.description}</p>

            <p className="font-semibold">📍 {job.location?.address}</p>

            <p className="text-green-600 font-bold mt-2">₹ {job.salary}</p>

            <p className="mt-2">
              <span className="font-bold">Status:</span> {job.status}
            </p>

            <p className="mt-2">
              <span className="font-bold">Worker:</span>{" "}
              {job.worker?.name || "Not Assigned"}
            </p>

            <div className="mt-5">
              <LiveMap job={job} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}