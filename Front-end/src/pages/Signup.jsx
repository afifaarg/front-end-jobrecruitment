import React, { useEffect, useState } from "react";
import YourInfo from "../components/YourInfo";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Step from "../components/Step";
import Thankyou from "../components/Thankyou";
import DesiredJob from "../components/Desiredjob";
import LoginInformations from "../components/Logininformations";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  // States
  const [stepNumber, setStepNumber] = useState(1);
  const [goBackVisible, setGoBackVisible] = useState("invisible");
  const [steps, setSteps] = useState([
    { id: 1, title: "General Informations", active: true },
    { id: 2, title: "Skills", active: false },
    { id: 3, title: "Education", active: false },
    { id: 4, title: "Experience", active: false },
    { id: 5, title: "Desired Job", active: false },
    { id: 6, title: "Login Informations", active: false },
  ]);

  // State management for forms
  const [yourInfo, setYourInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });
  const [isEmpty, setIsEmpty] = useState(false);

  const [skills, setSkills] = useState([]);
  const [isSkillsEmpty, setIsSkillsEmpty] = useState(false);

  const [educations, setEducations] = useState([
    {
      name: "",
      degree: "",
      field: "",
      start_date: "",
      description: "",
      end_date: "",
    },
  ]);
  const [isEducationsEmpty, setIsEducationsEmpty] = useState(false);

  const [experiences, setExperiences] = useState([
    {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      responsibilities: "",
    },
  ]);
  const [isExperiencesEmpty, setIsExperiencesEmpty] = useState(false);

  const [desiredJob, setdesiredJob] = useState({
    job_title: "",
    job_location: "",
    salary_expectation: "",
    contract_type: "",
    job_type: "",
    work_preference: "",
    description: "",
  });

  const [isJobEmpty, setIsJobEmpty] = useState(false);

  const [loginInfomations, setloginInfomations] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [isLoginInfoEmpty, setIsLoginInfoEmpty] = useState(false);

  const [displayThankyou, setDisplayThankyou] = useState(false);

  // Side Effects
  useEffect(() => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => ({ ...step, active: step.id === stepNumber }))
    );
    setGoBackVisible(stepNumber > 1 ? "visible" : "invisible");
  }, [stepNumber]);

  const submitForm = async () => {
    try {
      const payload = {
        username: loginInfomations.username,
        password: loginInfomations.password,
        name: yourInfo.name,
        email: yourInfo.email,
        phone: yourInfo.phone,
        country: yourInfo.country,
        city: yourInfo.city,
        description: yourInfo.description,
        skills: skills, // Assuming each skill is a string
        educations: educations.map((education) => ({
          degree: education.degree,
          field: education.field,
          institution: education.institution,
          start_date: education.start_date,
          end_date: education.end_date,
          description: education.description,
        })), // Ensure educations is an array of objects with correct fields
        experiences: experiences.map((experience) => ({
          job_title: experience.job_title,
          company: experience.company,
          location: experience.location,
          start_date: experience.start_date,
          end_date: experience.end_date,
          responsibilities: experience.responsibilities,
        })), // Ensure experiences is an array of objects with correct fields
        desiredJob: {
          job_title: desiredJob.job_title,
          job_location: desiredJob.job_location,
          salary_expectation: desiredJob.salary_expectation,
          contract_type: desiredJob.contract_type,
          job_type: desiredJob.job_type,
          work_preference: desiredJob.work_preference,
          description: desiredJob.description,
        }, // Ensure desiredJob is a flat object with correct fields
      };

      // Log the payload for debugging
      console.log("Payload to be sent:", payload);

      // Axios POST request to the Django backend
      const response = await axios.post(
        "http://localhost:8000/backendAPI/signup/",
        payload, // Send the payload as is, no need to stringify
        {
          headers: {
            "Content-Type": "application/json", // Set content type for Django
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        console.log("Signup successful!");
        setDisplayThankyou(true);
      } else {
        console.log("Error submitting form:", response.status, response.data);
      }
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
        alert(
          `Error: ${error.response.data.detail || "Something went wrong!"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response from server:", error.request);
      } else {
        // Something else happened
        console.error("Error:", error.message);
      }
    }
  };

  const nextStep = () => {
    if (
      stepNumber === 1 &&
      Object.values(yourInfo).some((value) => value.length === 0)
    ) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    if (stepNumber === 2 && skills.length === 0) {
      setIsSkillsEmpty(true);
      return;
    }
    setIsSkillsEmpty(false);

    if (stepNumber === 3 && educations.length === 0) {
      setIsEducationsEmpty(true);
      return;
    }
    setIsEducationsEmpty(false);

    if (stepNumber === 4 && experiences.length === 0) {
      setIsExperiencesEmpty(true);
      return;
    }
    setIsExperiencesEmpty(false);

    if (
      stepNumber === 5 &&
      Object.values(desiredJob).some((value) => value.length === 0)
    ) {
      setIsJobEmpty(true);
      return;
    }
    setIsJobEmpty(false);

    if (
      stepNumber === 6 &&
      Object.values(loginInfomations).some((value) => value.length === 0)
    ) {
      setIsLoginInfoEmpty(true);
      return;
    }
    setIsLoginInfoEmpty(false);

    // Submit form on the last step
    if (stepNumber === 6) {
      submitForm();
    } else {
      setStepNumber((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    setStepNumber((prevStep) => prevStep - 1);
  };

  const changeYourInfo = (event) => {
    const { name, value } = event.target;
    setYourInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSkillChange = (newSkills) => {
    setSkills(newSkills);
  };

  const handleEducationChange = (newEducation) => {
    setEducations(newEducation);
  };

  const handleExperienceChange = (newExperience) => {
    setExperiences(newExperience);
  };

  const handleJobChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setdesiredJob((prevJobDetails) => ({ ...prevJobDetails, [name]: value }));
  };
  const handleLoginInfoChange = (event) => {
    const { name, value } = event.target;
    setloginInfomations((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className="container mx-auto">
      <div className="rounded-xl p-0 md:p-3 flex flex-col md:flex-row justify-center min-h-screen max-w-6xl mx-auto">
        {/* Sidebar with Steps */}
        <div className="bg-primary grid grid-cols-6 md:grid-cols-1 px-4 border rounded-l-lg shadow-lg">
          {steps.map((step) => (
            <Step
              key={step.id}
              number={step.id}
              title={step.title}
              active={step.active}
              className="flex-shrink-0 text-secondary-text w-full"
            />
          ))}
        </div>

        {/* Main Form Area */}
        <div className="flex flex-col justify-between w-full bg-white py-10 px-8 rounded-r-lg">
          {displayThankyou ? (
            <Thankyou />
          ) : (
            <>
              <div>
                {stepNumber === 1 && (
                  <YourInfo
                    onChangeYourInfo={changeYourInfo}
                    yourInfo={yourInfo}
                    currentStep={stepNumber}
                    isEmpty={isEmpty}
                  />
                )}
                {stepNumber === 2 && (
                  <Skills
                    currentStep={stepNumber}
                    skills={skills}
                    isSkillsEmpty={isSkillsEmpty}
                    onChangeSkill={handleSkillChange}
                  />
                )}
                {stepNumber === 3 && (
                  <Education
                    currentStep={stepNumber}
                    educations={educations}
                    isEducationEmpty={isEducationsEmpty}
                    onChangeEducationInfo={handleEducationChange}
                  />
                )}
                {stepNumber === 4 && (
                  <Experience
                    currentStep={stepNumber}
                    experiences={experiences}
                    isExperienceEmpty={isExperiencesEmpty}
                    onChangeExperienceInfo={handleExperienceChange}
                  />
                )}
                {stepNumber === 5 && (
                  <DesiredJob
                    currentStep={stepNumber}
                    jobDetails={desiredJob}
                    isJobEmpty={isJobEmpty}
                    onChangeJobDetails={handleJobChange}
                  />
                )}
                {stepNumber === 6 && (
                  <LoginInformations
                    currentStep={stepNumber}
                    loginDetails={loginInfomations}
                    isLoginEmpty={isLoginInfoEmpty}
                    onChangeLoginDetails={handleLoginInfoChange}
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-10">
                <button
                  className={`bg-gray-400 text-secondary-text hover:bg-gray-500 hover:text-gray-50 px-5 py-3 rounded-md ${goBackVisible}`}
                  onClick={prevStep}
                >
                  Go Back
                </button>
                <button
                  className="bg-primary hover:bg-primary-light text-white px-5 py-3 rounded-md"
                  onClick={nextStep}
                >
                  {stepNumber === 6 ? "Submit" : "Next Step"}
                </button>
              </div>
              <div className="mt-5 text-center">
                <p className="text-black ">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-secondary-text  font-bold underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
