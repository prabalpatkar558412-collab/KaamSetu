import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import VoiceButton from "../components/VoiceButton";

export default function CreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    lat: "",
    lng: "",
    salary: "",
    skillsRequired: "",
  });

  const [voiceText, setVoiceText] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
      },

      () => {
        alert(
          "Location permission denied"
        );
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        description:
          voiceText || formData.description,

        location: {
          address: formData.address,
          lat: Number(formData.lat),
          lng: Number(formData.lng),
        },

        salary: Number(formData.salary),

        skillsRequired: [
          formData.skillsRequired,
        ],
      };

      await API.post("/jobs", payload);

      toast.success(
        "Job Created Successfully"
      );

      navigate("/jobs");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-6">
          Create Job
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full border p-3 rounded mb-4"
          rows="4"
          value={
            voiceText ||
            formData.description
          }
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Job Address"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            step="any"
            name="lat"
            placeholder="Latitude"
            value={formData.lat}
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="any"
            name="lng"
            placeholder="Longitude"
            value={formData.lng}
            className="w-full border p-3 rounded mb-4"
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full bg-green-600 text-white p-3 rounded-lg mb-4"
        >
          Use My Current Location
        </button>

        <input
          type="number"
          name="salary"
          placeholder="Daily Wage"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
          required
        />

        <select
          name="skillsRequired"
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        >
          <option value="">
            Select Work Category
          </option>

          <option value="plumber">
            Plumber
          </option>

          <option value="electrician">
            Electrician
          </option>

          <option value="painter">
            Painter
          </option>

          <option value="mason">
            Mason
          </option>

          <option value="carpenter">
            Carpenter
          </option>

          <option value="welder">
            Welder
          </option>

          <option value="driver">
            Driver
          </option>

          <option value="helper">
            Helper
          </option>
        </select>

        <VoiceButton
          setVoiceText={setVoiceText}
        />

        {voiceText && (
          <div className="mt-4 p-4 bg-blue-100 rounded">
            <h3 className="font-bold mb-2">
              Voice Input:
            </h3>

            <p>{voiceText}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg mt-6"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}