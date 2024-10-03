import React from "react";
import Education from "./Education";
import Skills from "./Skills";
import Experience from "./Experience";
// InputField component for reusable input fields
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
      placeholder={placeholder}
    />
  </div>
);

// Main ModalEdit component
export default function ModalEdit({
  show,
  handleClose,
  formData,
  handleChange,
  handleSubmit,
  section,
  handleSkillChange,
  handleExperienceChange,
  handleEducationChange,
}) {
  if (!show) return null; // Do not show modal if "show" is false

  // Functions to add or remove education
  const addEducation = () => {
    const newEducation = [
      ...formData.educations,
      { institution: "", degree: "", startDate: "", endDate: "" },
    ];
    handleChange({ target: { name: "educations", value: newEducation } });
  };

  const removeEducation = (index) => {
    const newEducation = formData.educations.filter((_, i) => i !== index);
    handleChange({ target: { name: "educations", value: newEducation } });
  };
  const removeSkill = (index) => {
    console.log(index);
    const newSkill = formData.skills.filter((_, i) => i !== index);
    handleChange({ target: { name: "skills", value: newSkill } });
  };
  // Functions to add or remove experience
  const addExperience = () => {
    const newExperience = [
      ...formData.experiences,
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        contractType: "",
        responsibilities: "",
      },
    ];
    handleChange({ target: { name: "experiences", value: newExperience } });
  };

  const removeExperience = (index) => {
    const newExperience = formData.experiences.filter((_, i) => i !== index);
    handleChange({ target: { name: "experiences", value: newExperience } });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Edit {section}</h2>
          <h3>Fill in the fields you wish to edit.</h3>

          {/* Form for editing different sections */}
          <div className="mt-4">
            {/* Personal Info Section */}
            {section === "personalInfo" && (
              <>
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <InputField
                  label="Proficiency"
                  name="proficiency"
                  value={formData.proficiency}
                  onChange={handleChange}
                  placeholder="Proficiency"
                />
                <InputField
                  label="Location"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Location"
                />
                <InputField
                  label="Profile Picture"
                  name="profileImage"
                  type="file"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "profileImage",
                        value: e.target.files[0],
                      },
                    })
                  }
                />
                <InputField
                  label="Resume file"
                  name="resume"
                  type="file"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "resume", value: e.target.files[0] },
                    })
                  }
                />
              </>
            )}

            {/* Skills Section */}
            {section === "Skills" && (
              <>
                <Skills
                  skills={formData.skills}
                  onChangeSkill={handleSkillChange}
                  removeSkill={removeSkill}
                />
              </>
            )}

            {/* Experience Section */}
            {section === "experience" && (
              <div>
                <Experience
                  experiences={formData.experiences}
                  onChangeExperienceInfo={handleExperienceChange}
                  addExperienceInfo={addExperience}
                />
              </div>
            )}

            {/* Education Section */}
            {section === "education" && (
              <Education
                educations={formData.educations}
                onChangeEducationInfo={handleEducationChange}
                addEducationInfo={addEducation}
                removeEducation={removeEducation}
              />
              //   {formData.educations.map((edu, index) => (
              //     <div
              //       key={index}
              //       className="mb-4 border p-3 rounded grid grid-cols-1 md:grid-cols-2 gap-4"
              //     >
              //       <InputField
              //         label="Institution"
              //         name={`institution-${index}`}
              //         value={edu.institution}
              //         onChange={(e) => handleEducationChange(e, index)}
              //         placeholder="Institution"
              //       />
              //       <InputField
              //         label="Degree"
              //         name={`degree-${index}`}
              //         value={edu.degree}
              //         onChange={(e) => handleEducationChange(e, index)}
              //         placeholder="Degree"
              //       />
              //       <InputField
              //         label="Start Date"
              //         name={`startDate-${index}`}
              //         value={edu.startDate}
              //         onChange={(e) => handleEducationChange(e, index)}
              //         placeholder="Start Date"
              //       />
              //       <InputField
              //         label="End Date"
              //         name={`endDate-${index}`}
              //         value={edu.endDate}
              //         onChange={(e) => handleEducationChange(e, index)}
              //         placeholder="End Date"
              //       />
              //       <button
              //         onClick={() => removeEducation(index)} // Handle deletion
              //         className="text-red-500"
              //       >
              //         Delete Education
              //       </button>
              //     </div>
              //   ))}
              //   <button
              //     onClick={addEducation}
              //     className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              //   >
              //     Add Education
              //   </button>
              // </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              Save Changes
            </button>
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
