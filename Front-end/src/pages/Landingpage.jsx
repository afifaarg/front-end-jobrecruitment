import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Modaledit from "../components/Modaledit";
export default function ProfileComponent() {
  const [manipulableJson, setManipulableJson] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState({
    about: false,
    info: false,
    skills: false,
  });

  // Fetching user data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("userData"); // Replace with your localStorage key
    if (data) {
      const userData = JSON.parse(data); // Parse the JSON string to an object
      console.log(userData);
      // Construct manipulableJson from userData
      const manipulableJson = {
        username: userData.username,
        password: userData.password, // Keep password only if needed
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        uniqueID: userData.uniqueID,
        experienceYears: userData.experienceYears,
        country: userData.country,
        city: userData.city,
        description: userData.description || "", // Fallback for undefined
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

      setManipulableJson(manipulableJson); // Update state with manipulableJson
    }
  }, []);

  // Handle input changes in the modal
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle editing button click
  const handleEditClick = (section) => {
    setCurrentSection(section);
    setFormData(manipulableJson); // Populate form with current data
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update manipulableJson and localStorage
    setManipulableJson((prev) => ({ ...prev, ...formData }));
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...manipulableJson, ...formData })
    );
    handleCloseModal();
  };
  const handleEducationChange = (index, value) => {
    console.log(formData.educations);
    const updatedEducations = [...formData.educations];

    updatedEducations[index] = value; // Update the specific entry
    setFormData((prevData) => ({
      ...prevData,
      educations: updatedEducations,
    }));
  };
  const handleExperienceChange = (index, value) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences[index] = value; // Update the specific entry
    setFormData((prevData) => ({
      ...prevData,
      experiences: updatedExperiences,
    }));
  };
  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value; // Update the specific entry
    setFormData((prevData) => ({
      ...prevData,
      skills: updatedSkills,
    }));
  };

  if (!manipulableJson) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <body
      className="flex flex-col bg-gray-100 antialiased"
      data-new-gr-c-s-check-loaded="14.1110.0"
      data-gr-ext-installed=""
    >
      <NavBar />
      <main className="main-container">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5">
            <div className="shadow rounded-xl overflow-hidden">
              <div className="h-32 bg-primary-light"></div>
              <div className="pt-14 p-4 bg-white relative">
                <span className="id-badge bg-primary">
                  #{manipulableJson.uniqueID}
                </span>
                <a href="/personal_cv/">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&s"
                    alt="Avatar"
                    className="user-photo"
                  />
                </a>
                <div className="flex justify-between right-1 items-center text-lg font-semibold mb-1.5">
                  <span>{manipulableJson.name}</span>
                  <a
                    onClick={() => handleEditClick("personalInfo")}
                    className="text-blue-500 hover:text-blue-600 py-2 rounded cursor-pointer"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      height="1.2em"
                      width="1.2em"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </a>
                </div>
                <div className="text-sm text-gray-400 mb-7">
                  Senior Developer
                </div>
                <div className="flex group">
                  <button className="transform active:scale-95 bg-blue-500 hover:bg-blue-400 text-white px-4 py-4 rounded-lg font-bold tracking-widest w-full ">
                    <div className="flex justify-center items-center relative">
                      <div className="svg-container">
                        {/* Download Icon */}
                        <svg
                          className="download-icon"
                          width="18"
                          height="22"
                          viewBox="0 0 18 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            className="download-arrow"
                            d="M13 9L9 13M9 13L5 9M9 13V1"
                            stroke="#F2F2F2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 17V18C1 18.7956 1.31607 19.5587 1.87868 20.1213C2.44129 20.6839 3.20435 21 4 21H14C14.7956 21 15.5587 20.6839 16.1213 20.1213C16.6839 19.5587 17 18.7956 17 18V17"
                            stroke="#F2F2F2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="download-loader text-white hidden"></div>
                        {/* Checked Icon */}
                        <svg
                          className="check-svg hidden"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.1071 7.9071C15.4976 7.51658 15.4976 6.88341 15.1071 6.49289C14.7165 6.10237 14.0834 6.10237 13.6929 6.49289L8.68568 11.5001L7.10707 9.92146C6.71655 9.53094 6.08338 9.53094 5.69286 9.92146C5.30233 10.312 5.30233 10.9452 5.69286 11.3357L7.97857 13.6214C8.3691 14.0119 9.00226 14.0119 9.39279 13.6214L15.1071 7.9071Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div className="button-copy pl-2 leading-none uppercase">
                        DOWNLOAD CV
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 block-section">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">Information</h2>
                <a
                  onClick={() => handleEditClick("General informations")}
                  className="text-blue-500 outline-none hover:text-blue-600 py-2 rounded curso"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.2em"
                    width="1.2em"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </a>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="text-gray-400">Location</div>
                  <div className="font-medium text-right text-gray-600">
                    {manipulableJson.city}, {manipulableJson.country}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Experience</div>
                  <div className="font-medium text-right text-gray-600">
                    +{manipulableJson.experienceYears} years
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-400">Availability</div>
                  <div className="font-medium text-right text-gray-600">
                    1 week
                  </div>
                </div>
              </div>
            </div>
            {/* Skills section */}
            <div className="p-4 block-section flow-root">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">Skills</h2>
                <a
                  onClick={() => handleEditClick("Skills")}
                  className="text-blue-500 hover:text-blue-600 py-2 rounded cursor-pointer"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.2em"
                    width="1.2em"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </a>
              </div>

              <div className="-m-2 flex flex-wrap">
                {manipulableJson.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-2">
            <div className="p-7 pb-0 block-section">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">About me</h2>
                <a
                  onClick={() => handleEditClick("about")}
                  className="text-blue-500 hover:text-blue-600 py-2 rounded cursor-pointer"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.2em"
                    width="1.2em"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-600 mb-5">
                {manipulableJson.description}.
              </p>

              <div className="flex flex-col space-y-4">
                <a
                  href="#0"
                  className="flex items-center  text-primary-light space-x-2 font-bold  [&_span]hover:text-primary-dark"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c1.466 0 2.961-.371 4.442-1.104l-.885-1.793C14.353 19.698 13.156 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1c0 .692-.313 2-1.5 2-1.396 0-1.494-1.819-1.5-2V8h-2v.025A4.954 4.954 0 0012 7c-2.757 0-5 2.243-5 5s2.243 5 5 5c1.45 0 2.748-.631 3.662-1.621.524.89 1.408 1.621 2.838 1.621 2.273 0 3.5-2.061 3.5-4v-1c0-5.514-4.486-10-10-10zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
                  </svg>
                  <span>{manipulableJson.email}</span>
                </a>

                <ul className="flex items-center space-x-5">
                  <li>
                    <a href="#0" className="hover:text-primary">
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1.4em"
                        width="1.4em"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#0" className="hover:text-primary">
                      <svg
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        height="1.4em"
                        width="1.4em"
                      >
                        <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="#0" className="hover:text-primary">
                      <svg
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        height="1.4em"
                        width="1.4em"
                      >
                        <path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-200 my-5"></div>

              <ul className="flex space-x-8 font-medium">
                <li>
                  <a
                    href="#experiences"
                    className="menu-link-active menu-link-hover"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#educations" className="menu-link menu-link-hover">
                    Education
                  </a>
                </li>
                <li>
                  <a
                    href="/personal_cv/blog.html"
                    className="menu-link menu-link-hover"
                  >
                    Desired Job
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-7 block-section" id="experiences">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">Experience</h2>
                <a
                  onClick={() => handleEditClick("experience")}
                  className="text-blue-500 hover:text-blue-600 py-2 rounded cursor-pointer"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.2em"
                    width="1.2em"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </a>
              </div>
              {manipulableJson.experiences.map((exp, index) => (
                <div className="mb-5 item-section">
                  <div
                    className="company-logo"
                    style={{ backgroundColor: "#1DA1F2" }}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M9 12H1v6a2 2 0 002 2h14a2 2 0 002-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 012-2h4a2 2 0 012 2v1h4a2 2 0 012 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg>
                  </div>

                  <div className="w-full space-y-5">
                    <div className="item-header">
                      <div className="space-y-1.5">
                        <div className="font-medium">{exp.job_title}</div>
                        <div className="flex space-x-5">
                          <div className="item-header-info">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              ></path>
                            </svg>

                            <span>{exp.company}</span>
                          </div>
                          <div className="item-header-info">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 sm:text-right">
                        <div className="job-item-badge">Full time</div>
                        <div className="item-header-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <span>
                            {exp.start_date} – {exp.end_date || "Present"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{exp.responsibilities}</p>
                    <div className="border-b border-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-7 block-section" id="educations">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-xl">Education</h2>
                <a
                  onClick={() => handleEditClick("education")}
                  className="text-blue-500 hover:text-blue-600 py-2 rounded cursor-pointer"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.2em"
                    width="1.2em"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </a>
              </div>
              {manipulableJson.educations.map((edu, index) => (
                <div className="mb-5 item-section">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cover">
                    <svg
                      viewBox="0 0 640 512"
                      fill="currentColor"
                      height="2em"
                      width="2em"
                    >
                      <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9V320c0 28.4-10.8 57.7-22.3 80.8-6.5 13-13.9 25.8-22.5 37.6-3.2 4.3-4.1 9.9-2.3 15s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7.3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7-3.2-14.2-7.5-28.7-13.5-42v-24.6c0-30.2 10.2-58.7 27.9-81.5 12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5.8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1l280.6-101c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1c-7.6-2.7-15.6-4.1-23.7-4.1zM128 408c0 35.3 86 72 192 72s192-36.7 192-72l-15.3-145.4L354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6l-142.2-51.4L128 408z" />
                    </svg>
                  </div>

                  <div className="w-full space-y-5">
                    <div className="item-header items-end">
                      <div className="space-y-1.5">
                        <div className="font-medium capitalize">
                          {edu.degree} in {edu.field}
                        </div>

                        <div className="flex space-x-5">
                          <div className="item-header-info capitalize">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                              ></path>
                            </svg>
                            <span>{edu.institution}</span>
                          </div>
                          <div className="item-header-info">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                            <span>London</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:text-right">
                        <div className="item-header-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          <span>
                            {edu.start_date} – {edu.end_date || "Now"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Modaledit
          show={showModal}
          handleClose={handleCloseModal}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleEducationChange={handleEducationChange}
          handleExperienceChange={handleExperienceChange}
          handleSkillChange={handleSkillsChange}
          section={currentSection}
        />
      </main>
    </body>
  );
}
