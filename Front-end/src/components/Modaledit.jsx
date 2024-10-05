import React from "react";
import Education from "./Education";
import Skills from "./Skills";
import Experience from "./Experience";
import FormField from "./FormField";
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
  if (!show) return null;

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
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Edit {section}</h2>
            <div onClick={handleClose} className="cursor-pointer text-xl">
              X
            </div>
          </div>

          <div className="mt-4">
            {section === "personalInfo" && (
              <>
                <FormField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChangeYourInfo={handleChange}
                  placeholder="Name"
                  type="text"
                />
                <FormField
                  label="Profile Picture"
                  name="profileImage"
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "profileImage",
                        value: e.target.files[0],
                      },
                    })
                  }
                  type="file"
                  placeholder="Upload Profile Picture"
                />
                <FormField
                  label="Resume file"
                  name="resume"
                  onChange={(e) =>
                    handleChange({
                      target: { name: "resume", value: e.target.files[0] },
                    })
                  }
                  type="file"
                  placeholder="Upload Resume"
                />
                <FormField
                  label="Resume file"
                  name="resume"
                  value={formData.resume}
                  onChangeYourInfo={(e) =>
                    handleChange({
                      target: {
                        name: "resume",
                        value: e.target.files[0],
                      },
                    })
                  }
                  type="file"
                  placeholder="Upload Resume"
                />
              </>
            )}

            {section === "AdditionalInfo" && (
              <>
                <FormField
                  label="Location"
                  name="country"
                  value={formData.country}
                  onChangeYourInfo={handleChange}
                  placeholder="Location"
                  type="text"
                />
                <FormField
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChangeYourInfo={handleChange}
                  type="select"
                  options={[
                    { value: "", label: "Select Gender" },
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
                <FormField
                  label="Birth Date"
                  name="birth_Date"
                  value={formData.birth_Date}
                  onChangeYourInfo={handleChange}
                  type="date"
                  placeholder="Birth Date"
                />
              </>
            )}

            {section === "about" && (
              <>
                <FormField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChangeYourInfo={handleChange}
                  placeholder="Description"
                  type="long"
                />
                <FormField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChangeYourInfo={handleChange}
                  placeholder="Email"
                  type="email"
                />
                <FormField
                  label="Github Link"
                  name="github_link"
                  value={formData.github_link}
                  onChangeYourInfo={handleChange}
                  placeholder="Github Link"
                  type="text"
                />
                <FormField
                  label="LinkedIn Link"
                  name="linkedin_link"
                  value={formData.linkedin_link}
                  onChangeYourInfo={handleChange}
                  placeholder="LinkedIn Link"
                  type="text"
                />
                <FormField
                  label="Portfolio Link"
                  name="portfolio_link"
                  value={formData.portfolio_link}
                  onChangeYourInfo={handleChange}
                  placeholder="Portfolio Link"
                  type="text"
                />
              </>
            )}

            {section === "Skills" && (
              <Skills
                skills={formData.skills}
                onChangeSkill={handleSkillChange}
                removeSkill={removeSkill}
              />
            )}

            {section === "experience" && (
              <Experience
                experiences={formData.experiences}
                onChangeExperienceInfo={handleExperienceChange}
                addExperienceInfo={addExperience}
              />
            )}

            {section === "education" && (
              <Education
                educations={formData.educations}
                onChangeEducationInfo={handleEducationChange}
                addEducationInfo={addEducation}
                removeEducation={removeEducation}
              />
            )}
            <div className="flex justify-end items-end space-x-2">
              <button
                onClick={handleClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
