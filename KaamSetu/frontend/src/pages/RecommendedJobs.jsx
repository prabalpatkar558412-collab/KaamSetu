import { useEffect, useState } from "react";
import API from "../services/api";

export default function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  const fetchRecommendedJobs = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await API.post(
        "/jobs/recommended",
        {
          skills: user.skills || [],
        }
      );

      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">
        Recommended Jobs
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-2xl font-bold">
              {job.title}
            </h2>

            <p className="mt-3">
              {job.description}
            </p>

            <p className="mt-2">
              📍 {job.location}
            </p>

            <p className="mt-2 text-green-600 font-bold">
              ₹ {job.salary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}