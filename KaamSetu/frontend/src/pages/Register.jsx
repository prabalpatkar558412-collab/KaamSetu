import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker",
    phone: "",
    location: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      };

      const { data } = await API.post(
        "/auth/register",
        payload
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      toast.success("Registration Successful");

      navigate("/choose-role");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 border rounded mb-6"
        >
          <option value="worker">
            Worker
          </option>

          <option value="contractor">
            Contractor
          </option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}