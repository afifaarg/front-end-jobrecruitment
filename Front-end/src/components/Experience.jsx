import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

export default function Experience({
  experiences,
  onChangeExperienceInfo,
  isExperienceEmpty,
  addExperienceInfo,
}) {
  // Initialize the local state with experiences prop
  const [experienceForms, setExperienceForms] = useState(experiences);

  // Synchronize the local state with the parent experiences when the component mounts or experiences prop changes
  useEffect(() => {
    setExperienceForms(experiences);
  }, [experiences]);

  const addExperienceForm = () => {
    const newForm = {
      job_title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      responsibilities: "",
      currentlyWorking: false,
    };
    const updatedForms = [...experienceForms, newForm];
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms); // Update parent state
  };

  const removeExperienceForm = (index) => {
    const updatedForms = experienceForms.filter((_, i) => i !== index);
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms); // Update parent state
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedForms = [...experienceForms];
    updatedForms[index][name] = type === "checkbox" ? checked : value;
    setExperienceForms(updatedForms);
    onChangeExperienceInfo(updatedForms); // Update parent state
  };

  return (
    <div>
      <SectionHeading
        title="Experience Information"
        desc="Please fill in the below form."
      />
      <form>
        <div className="block space-y-4 mb-6 max-h-[350px] overflow-y-scroll">
          {experienceForms.map((form, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "job_title",
                    label: "Job Title",
                    placeholder: "e.g Software Engineer",
                    type: "text",
                  },
                  {
                    name: "company",
                    label: "Company",
                    placeholder: "e.g Google",
                    type: "text",
                  },
                  {
                    name: "location",
                    label: "Location",
                    placeholder: "e.g San Francisco",
                    type: "text",
                  },
                  {
                    name: "start_date",
                    label: "Start Date",
                    placeholder: "e.g 01/09/2021",
                    type: "date",
                  },
                ].map((field) => (
                  <FormField
                    key={field.name}
                    onChangeYourInfo={(e) => handleExperienceChange(index, e)}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    isEmpty={isExperienceEmpty}
                    type={field.type}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  onChangeYourInfo={(e) => handleExperienceChange(index, e)}
                  name="end_date"
                  label="End Date"
                  placeholder="e.g 01/09/2022"
                  value={form.end_date}
                  isEmpty={isExperienceEmpty}
                  type="date"
                  disabled={form.currentlyWorking}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="currentlyWorking"
                    checked={form.currentlyWorking}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="mr-2"
                  />
                  <label className="text-sm">Currently working here</label>
                </div>
              </div>

              <FormField
                onChangeYourInfo={(e) => handleExperienceChange(index, e)}
                name="responsibilities"
                label="Responsibilities"
                placeholder="Describe your role and achievements"
                value={form.responsibilities}
                isEmpty={isExperienceEmpty}
                type="long"
              />

              <button
                type="button"
                className="text-red-500 space-x-2 font-bold mt-4 rounded flex items-center"
                onClick={() => removeExperienceForm(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9.586L4.293 3.879a1 1 0 00-1.414 1.414L8.586 11l-5.707 5.707a1 1 0 001.414 1.414L10 12.414l5.707 5.707a1 1 0 001.414-1.414L11.414 11l5.707-5.707a1 1 0 00-1.414-1.414L10 9.586z"
                    clipRule="evenodd"
                  />
                </svg>
                Remove Experience
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 text-blue-500 flex items-center font-bold space-x-2"
          onClick={addExperienceInfo ? addExperienceInfo : addExperienceForm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Another Experience
        </button>
      </form>
    </div>
  );
}
