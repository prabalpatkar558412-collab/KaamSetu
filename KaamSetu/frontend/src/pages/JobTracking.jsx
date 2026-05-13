import React, {
  useEffect,
  useState,
} from "react";

import LiveMap from "../components/LiveMap";

import { startTracking } from "../utils/tracking";

import API from "../services/api";

export default function JobTracking() {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const storedJob = JSON.parse(
      localStorage.getItem("activeJob")
    );

    if (storedJob) {
      setJob(storedJob);
      startTracking(storedJob._id);
    }
  }, []);

  const updateStatus = async (status) => {
    try {
      await API.put(
        `/jobs/status/${job._id}`,
        { status }
      );

      alert(`Job marked as ${status}`);

      const updatedJob = {
        ...job,
        status,
      };

      setJob(updatedJob);

      localStorage.setItem(
        "activeJob",
        JSON.stringify(updatedJob)
      );
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Status update failed"
      );
    }
  };

  if (!job) {
    return (
      <div className="p-10 text-2xl">
        No Active Job Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Live Job Tracking
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-2xl font-bold">
          {job.title}
        </h2>

        <p className="mt-2">
          {job.description}
        </p>

        <p className="mt-3">
          📍 {job.location.address}
        </p>

        <p className="text-green-600 font-bold mt-2">
          ₹ {job.salary}
        </p>

        <p className="text-blue-600 font-bold mt-2">
          Status: {job.status || "accepted"}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <LiveMap job={job} />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() =>
            updateStatus("on_the_way")
          }
          className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold"
        >
          Start Work
        </button>

        <button
          onClick={() =>
            updateStatus("completed")
          }
          className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold"
        >
          Mark Completed
        </button>
      </div>
    </div>
  );
}