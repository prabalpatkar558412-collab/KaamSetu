import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const skillsData = [
  {
    name: "Electrician",
    image:
      "https://cdn-icons-png.flaticon.com/512/2942/2942813.png",
  },
  {
    name: "Plumber",
    image:
      "https://cdn-icons-png.flaticon.com/512/3659/3659899.png",
  },
  {
    name: "Painter",
    image:
      "https://cdn-icons-png.flaticon.com/512/2203/2203187.png",
  },
  {
    name: "Carpenter",
    image:
      "https://cdn-icons-png.flaticon.com/512/1995/1995470.png",
  },
  {
    name: "Welder",
    image:
      "https://cdn-icons-png.flaticon.com/512/2942/2942789.png",
  },
  {
    name: "Labour",
    image:
      "https://cdn-icons-png.flaticon.com/512/921/921347.png",
  },
];

export default function ChooseSkills() {
  const [selectedSkills, setSelectedSkills] =
    useState([]);

  const navigate = useNavigate();

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter(
          (s) => s !== skill
        )
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skill,
      ]);
    }
  };

  const saveSkills = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await API.put(
        "/auth/update-profile",
        {
          skills: selectedSkills,
        },
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

      toast.success("Skills Updated");

      navigate("/worker-dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Select Your Skills
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {skillsData.map((skill) => (
          <div
            key={skill.name}
            onClick={() =>
              toggleSkill(skill.name)
            }
            className={`cursor-pointer p-6 rounded-2xl shadow-lg bg-white text-center transition hover:scale-105 ${
              selectedSkills.includes(skill.name)
                ? "border-4 border-blue-600"
                : ""
            }`}
          >
            <img
              src={skill.image}
              alt={skill.name}
              className="w-24 h-24 mx-auto mb-4"
            />

            <h2 className="text-2xl font-bold">
              {skill.name}
            </h2>
          </div>
        ))}
      </div>

      <button
        onClick={saveSkills}
        className="mt-10 w-full bg-blue-600 text-white p-4 rounded-xl text-xl font-bold"
      >
        Continue
      </button>
    </div>
  );
}