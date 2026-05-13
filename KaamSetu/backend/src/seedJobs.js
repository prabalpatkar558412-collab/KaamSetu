
import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import Job from "./models/Job.js";

dotenv.config();

await connectDB();

const categories = [
  "plumber",
  "electrician",
  "painter",
  "mason",
  "carpenter",
  "welder",
  "helper",
  "driver",
];

const titles = {
  plumber: [
    "Pipe Repair",
    "Bathroom Fitting",
    "Water Tank Repair",
  ],

  electrician: [
    "House Wiring",
    "Fan Installation",
    "Light Repair",
  ],

  painter: [
    "Wall Painting",
    "Home Paint Work",
    "Office Painting",
  ],

  mason: [
    "Brick Work",
    "Floor Construction",
    "Boundary Wall Work",
  ],

  carpenter: [
    "Furniture Repair",
    "Door Installation",
    "Wood Work",
  ],

  welder: [
    "Gate Welding",
    "Iron Fabrication",
    "Steel Work",
  ],

  helper: [
    "Construction Helper",
    "Loading Work",
    "Site Helper",
  ],

  driver: [
    "Delivery Driver",
    "Truck Driver",
    "Pickup Driver",
  ],
};

const cities = [
  {
    name: "Bhopal",
    lat: 23.2599,
    lng: 77.4126,
  },

  {
    name: "Jabalpur",
    lat: 23.1815,
    lng: 79.9864,
  },

  {
    name: "Indore",
    lat: 22.7196,
    lng: 75.8577,
  },

  {
    name: "Delhi",
    lat: 28.6139,
    lng: 77.2090,
  },

  {
    name: "Mumbai",
    lat: 19.0760,
    lng: 72.8777,
  },
];

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generateJobs = async () => {
  try {
    await Job.deleteMany();

    const jobs = [];

    for (let i = 0; i < 1000; i++) {
      const category =
        categories[
          Math.floor(
            Math.random() * categories.length
          )
        ];

      const city =
        cities[
          Math.floor(
            Math.random() * cities.length
          )
        ];

      const titleList = titles[category];

      const title =
        titleList[
          Math.floor(
            Math.random() * titleList.length
          )
        ];

      jobs.push({
        title,

        description: `${title} required urgently`,

        location: {
          address: city.name,

          lat:
            city.lat +
            randomNumber(-0.05, 0.05),

          lng:
            city.lng +
            randomNumber(-0.05, 0.05),
        },

        salary: Math.floor(
          randomNumber(500, 3000)
        ),

        skillsRequired: [category],

        status: "available",
      });
    }

    await Job.insertMany(jobs);

    console.log(
      "✅ 1000 Jobs Added Successfully"
    );

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

generateJobs();