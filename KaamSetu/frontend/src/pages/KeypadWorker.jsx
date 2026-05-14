import { useState } from "react";
import API from "../services/api";

export default function KeypadWorker() {
  const [phone, setPhone] = useState("");
  const [skill, setSkill] = useState("plumber");
  const [assignedJob, setAssignedJob] = useState(null);

  const assignJob = async () => {
    try {
      const { data } = await API.get("/jobs/available");

      const matchedJob = data.find((job) =>
        job.skillsRequired?.includes(skill)
      );

      if (!matchedJob) {
        alert("No job found for this skill");
        return;
      }

      setAssignedJob(matchedJob);

      alert(
        `SMS Sent to ${phone}: Job assigned at ${matchedJob.location.address}`
      );
    } catch (error) {
      alert("Failed to assign job");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 text-white flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-xl w-full shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-3">
          Keypad Phone Worker Mode
        </h1>

        <p className="text-gray-300 mb-6">
          For workers without smartphones. Assign nearby jobs through SMS/call simulation.
        </p>

        <input
          type="text"
          placeholder="Worker Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 rounded-xl text-black mb-4"
        />

        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full p-4 rounded-xl text-black mb-6"
        >
          <option value="plumber">Plumber</option>
          <option value="electrician">Electrician</option>
          <option value="painter">Painter</option>
          <option value="mason">Mason</option>
          <option value="carpenter">Carpenter</option>
          <option value="helper">Helper</option>
          <option value="driver">Driver</option>
        </select>

        <button
          onClick={assignJob}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl font-bold text-xl"
        >
          Send Job by SMS
        </button>

        {assignedJob && (
          <div className="mt-6 bg-black/40 p-5 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-2">
              Job Assigned
            </h2>

            <p>{assignedJob.title}</p>
            <p>📍 {assignedJob.location.address}</p>
            <p>₹ {assignedJob.salary}</p>
            <p className="text-green-400 mt-3">
              SMS Simulation: Sent to {phone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}