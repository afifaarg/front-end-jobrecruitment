import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://127.0.0.1:8000/backendAPI/login/", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data.user_data; // Ensure this matches your response structure

          if (userData) {
            // Create a new JSON structure
            const manipulableJson = {
              username: userData.username,
              password: userData.password, // Keep password only if needed
              name: userData.name,
              email: userData.email,
              experienceYears: userData.experienceYears,
              uniqueID: userData.uniqueID,
              phone: userData.phone,
              country: userData.country,
              city: userData.city,
              description: userData.description || ``, // Fallback for undefined
              skills: userData.skills || [], // Default to empty array if no skills
              educations: userData.educations
                ? userData.educations.map((edu) => ({
                    degree: edu.degree,
                    field: edu.field,
                    institution: edu.institution,
                    start_date: edu.start_date,
                    end_date: edu.end_date,
                    description: edu.description || "", // Fallback for undefined
                  }))
                : [],
              experiences: userData.experiences
                ? userData.experiences.map((exp) => ({
                    job_title: exp.job_title,
                    company: exp.company,
                    location: exp.location,
                    start_date: exp.start_date,
                    end_date: exp.end_date,
                    responsibilities: exp.responsibilities || "", // Fallback for undefined
                  }))
                : [],
            };

            // Save the manipulable JSON structure to localStorage as a string
            localStorage.setItem("userData", JSON.stringify(manipulableJson));

            // save tokens
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            navigate("/Landed");
          } else {
            console.error("User data is undefined");
          }
        }
      })
      .catch((error) => {
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="flex h-screen w-full items-center space-x-2 justify-center ">
      <div className="flex items-center  overflow-hidden rounded-lg   lg:flex-row bg-gray-50 shadow-lg border">
        {/* Left Section - Image */}
        <div className="hidden h-full md:flex lg:w-1/2 border-r-2">
          <img
            className="object-cover  rounded-lg"
            src={"/cover-img.png"}
            alt="Login illustration"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2  rounded-lg">
          <h2 className="mb-2 text-5xl font-bold text-secondary-text">Login</h2>
          <p className="mb-6 text-sm text-secondary-muted">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                className="p-3 border-b-2 border-gray-500  outline-none rounded-lg bg-gray-50"
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                className="p-3 border-b-2 border-gray-500 rounded-lg outline-none bg-gray-50 w-full"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Eye Icon for Toggle */}
              <button
                type="button"
                className="absolute right-3 bottom-2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <button className="mt-4 bg-primary text-white py-3 rounded-lg hover:scale-105 transform transition duration-300">
              Login
            </button>
          </form>

          <div className="mt-4 text-md flex mx-auto items-center text-secondary-text">
            <p>Don't have an account?</p>
            <Link
              to="/SignUp"
              className="px-4 py-2  text-md font-bold underline text-secondary-text rounded-lg hover:text-[#323138] transform transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
