import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Import ArcElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Register ArcElement
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const countries = {};
  const genders = {};
  const joinedDates = {};
  const experienceYears = {};
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Retrieve members from localStorage
    const storedMembers = JSON.parse(localStorage.getItem("allUsers")) || [];
    setMembers(storedMembers);
  }, []);
  members.forEach((user) => {
    if (user.country) {
      countries[user.country] = (countries[user.country] || 0) + 1;
    }
    if (user.gender) {
      genders[user.gender] = (genders[user.gender] || 0) + 1;
    }
    const date = user.joinedDate ? user.joinedDate.split("T")[0] : null;
    if (date) {
      joinedDates[date] = (joinedDates[date] || 0) + 1;
    }
    if (user.experienceYears !== undefined) {
      const expKey = `${user.experienceYears} Years`;
      experienceYears[expKey] = (experienceYears[expKey] || 0) + 1;
    }
  });

  const countryData = {
    labels: Object.keys(countries),
    datasets: [
      {
        label: "Users by Country",
        data: Object.values(countries),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const genderData = {
    labels: Object.keys(genders),
    datasets: [
      {
        label: "Users by Gender",
        data: Object.values(genders),
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const experienceData = {
    labels: Object.keys(experienceYears),
    datasets: [
      {
        label: "Users by Experience",
        data: Object.values(experienceYears),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const joinedDateData = {
    labels: Object.keys(joinedDates),
    datasets: [
      {
        label: "Users by Join Date",
        data: Object.values(joinedDates),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">User Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded shadow-lg p-4 h-96">
          <h3 className="text-lg mb-2 font-bold text-center text-secondary-text">
            Users by Country
          </h3>
          <Bar data={countryData} options={options} />
        </div>
        <div className="bg-white rounded shadow p-4 h-96">
          <h3 className="text-lg mb-2 font-bold text-center text-secondary-text">
            Users by Gender
          </h3>
          <Pie className="py-2 mb-12 mx-auto" data={genderData} />
        </div>
        <div className="bg-white rounded shadow p-4 h-96">
          <h3 className="text-lg mb-2 font-bold text-center text-secondary-text">
            Users by Years of Experience
          </h3>
          <Bar data={experienceData} options={options} />
        </div>
        <div className="bg-white rounded shadow p-4 h-96">
          <h3 className="text-lg mb-2 font-bold text-center text-secondary-text">
            Users by Join Date
          </h3>
          <Line data={joinedDateData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
