import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

export default function ChooseRole() {
  const navigate = useNavigate();
  const [loadingRole, setLoadingRole] = useState("");

  const selectRole = async (role) => {
    try {
      setLoadingRole(role);

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      if (!userInfo?.token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const { data } = await API.put(
        "/auth/update-profile",
        { role },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      toast.success(
        role === "worker"
          ? "Worker role selected"
          : "Contractor role selected"
      );

      if (role === "worker") {
        navigate("/choose-skills");
      } else {
        navigate("/contractor-dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoadingRole("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold mb-2">
            Welcome to KaamSetu
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Choose Your Role
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Select how you want to use the platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            type="button"
            onClick={() => selectRole("worker")}
            disabled={loadingRole !== ""}
            className="group bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 text-left hover:shadow-2xl hover:-translate-y-2 transition disabled:opacity-60"
          >
            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Worker"
                  className="w-24 h-24"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-900">
              Worker
            </h2>

            <p className="text-gray-600 text-center mt-4 leading-relaxed">
              Find nearby jobs, select skills, accept work instantly,
              and navigate to the job location.
            </p>

            <div className="mt-8 bg-blue-600 text-white text-center py-3 rounded-xl font-semibold">
              {loadingRole === "worker"
                ? "Saving..."
                : "Continue as Worker"}
            </div>
          </button>

          <button
            type="button"
            onClick={() => selectRole("contractor")}
            disabled={loadingRole !== ""}
            className="group bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 text-left hover:shadow-2xl hover:-translate-y-2 transition disabled:opacity-60"
          >
            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-full bg-green-100 flex items-center justify-center group-hover:scale-110 transition">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                  alt="Contractor"
                  className="w-24 h-24"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-900">
              Contractor
            </h2>

            <p className="text-gray-600 text-center mt-4 leading-relaxed">
              Post labour jobs, hire skilled workers, manage attendance,
              and track work progress.
            </p>

            <div className="mt-8 bg-green-600 text-white text-center py-3 rounded-xl font-semibold">
              {loadingRole === "contractor"
                ? "Saving..."
                : "Continue as Contractor"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}