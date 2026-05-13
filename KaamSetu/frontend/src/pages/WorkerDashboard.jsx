import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getAvailableJobs,
  bookJob,
} from "../services/jobService";
import { socket } from "../socket";

export default function WorkerDashboard() {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("userInfo")
    );

    setUser(data);

    if (data?._id) {
      socket.emit("worker_online", data._id);
    }

    fetchJobs();

    return () => {
      if (data?._id) {
        socket.emit("worker_offline", data._id);
      }
    };
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAvailableJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookJob = async (jobId) => {
    try {
      await bookJob(jobId);

      alert("Job booked successfully!");

      fetchJobs();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800">
        Worker Dashboard
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>

        <span className="font-bold text-green-700 text-lg">
          You are Online
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Profile Information
        </h2>

        <div className="space-y-3">
          <p>
            <span className="font-bold">Name:</span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="font-bold">Email:</span>{" "}
            {user?.email}
          </p>

          <p>
            <span className="font-bold">Role:</span>{" "}
            {user?.role}
          </p>

          <p>
            <span className="font-bold">Status:</span>{" "}
            <span className="text-green-600 font-bold">
              Online
            </span>
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onClick={() => {
          window.location.href = "/jobs";
        }}
        className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white text-2xl font-bold py-6 rounded-3xl shadow-2xl mb-8"
      >
        Find Work Now
      </motion.button>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          Nearby Available Jobs
        </h2>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p>No available jobs</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="border rounded-xl p-5 shadow"
              >
                <h3 className="text-2xl font-bold mb-2">
                  {job.title}
                </h3>

                <p className="mb-2">
                  {job.description}
                </p>

                <p className="font-semibold">
                  📍 {job.location?.address}
                </p>

                <p className="font-bold text-green-600 mt-2">
                  ₹ {job.salary}
                </p>

                <button
                  onClick={() => handleBookJob(job._id)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Book Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}