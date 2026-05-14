import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import KeypadWorker from "./pages/KeypadWorker";
import Chatbot from "./pages/Chatbot";
import JobTracking from "./pages/JobTracking";
import Attendance from "./pages/Attendance";
import RecommendedJobs from "./pages/RecommendedJobs";
import WorkerDashboard from "./pages/WorkerDashboard";
import ContractorDashboard from "./pages/ContractorDashboard";
import ChooseRole from "./pages/ChooseRole";
import ChooseSkills from "./pages/ChooseSkills";
import CreateJob from "./pages/CreateJob";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PUBLIC PAGES */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/job-tracking" element={<JobTracking />} />
<Route
  path="/choose-role"
  element={
    <ProtectedRoute>
      <ChooseRole />
    </ProtectedRoute>
  }
/>
<Route
  path="/choose-skills"
  element={
    <ProtectedRoute>
      <ChooseSkills />
    </ProtectedRoute>
  }
/>
        <Route
          path="/recommended-jobs"
          element={<RecommendedJobs />}
        />
        <Route path="/keypad-worker" element={<KeypadWorker />} />

        {/* PROTECTED WORKER DASHBOARD */}
        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        {/* PROTECTED CONTRACTOR DASHBOARD */}
        <Route
          path="/contractor-dashboard"
          element={
            <ProtectedRoute>
              <ContractorDashboard />
            </ProtectedRoute>
          }
        />

        {/* CREATE JOB */}
        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}