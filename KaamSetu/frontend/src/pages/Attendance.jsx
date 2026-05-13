import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Attendance() {
  const [attendance, setAttendance] =
    useState([]);

  const [wage, setWage] = useState("");

  const user = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const { data } = await API.get(
        "/attendance"
      );

      setAttendance(data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAttendance = async () => {
    try {
      await API.post("/attendance", {
        worker: user._id,
        wage,
      });

      toast.success(
        "Attendance Marked"
      );

      fetchAttendance();
    } catch (error) {
      toast.error(
        "Failed to mark attendance"
      );
    }
  };

  const totalEarnings =
    attendance.reduce(
      (acc, item) => acc + item.wage,
      0
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">
        Attendance & Wages
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Mark Attendance
        </h2>

        <input
          type="number"
          placeholder="Today's Wage"
          value={wage}
          onChange={(e) =>
            setWage(e.target.value)
          }
          className="border p-3 rounded w-full mb-4"
        />

        <button
          onClick={markAttendance}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Mark Present
        </button>
      </div>

      <div className="bg-green-600 text-white p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-bold">
          Total Earnings
        </h2>

        <p className="text-4xl mt-3">
          ₹ {totalEarnings}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">
          Attendance History
        </h2>

        <div className="space-y-4">
          {attendance.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg"
            >
              <p>
                <span className="font-bold">
                  Worker:
                </span>{" "}
                {item.worker?.name}
              </p>

              <p>
                <span className="font-bold">
                  Wage:
                </span>{" "}
                ₹ {item.wage}
              </p>

              <p>
                <span className="font-bold">
                  Status:
                </span>{" "}
                {item.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}