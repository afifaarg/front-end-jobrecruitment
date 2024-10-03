import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

export default function Education({
  educations,
  onChangeEducationInfo,
  isEducationEmpty,
  addEducationInfo,
  removeEducation,
}) {
  // Initialize the local state with educations prop
  const [educationForms, setEducationForms] = useState(educations);

  // Synchronize the local state with the parent educations when the component mounts or educations prop changes
  useEffect(() => {
    setEducationForms(educations);
  }, [educations]);

  const addEducationForm = () => {
    const newForm = {
      degree: "",
      field: "",
      institution: "",
      start_date: "",
      end_date: "",
      description: "",
      stillStudying: false,
    };
    const updatedForms = [...educationForms, newForm];
    setEducationForms(updatedForms);
    onChangeEducationInfo(updatedForms); // Update parent state
  };

  const removeEducationForm = (index) => {
    const updatedForms = educationForms.filter((_, i) => i !== index);
    setEducationForms(updatedForms);
    onChangeEducationInfo(updatedForms); // Update parent state
  };

  const handleEducationChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedForms = [...educationForms];
    updatedForms[index][name] = type === "checkbox" ? checked : value;
    setEducationForms(updatedForms);
    onChangeEducationInfo(updatedForms); // Update parent state
  };

  return (
    <div>
      <SectionHeading
        title="Education Informations"
        desc="Please fill in the below form."
      />
      <form>
        <div className="block space-y-4 mb-6 max-h-[375px] overflow-y-scroll">
          {educationForms.map((form, index) => (
            <div key={index} className="border-b border-gray-300 pb-4 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "degree",
                    label: "Degree",
                    placeholder: "e.g Bachelor",
                    type: "text",
                  },
                  {
                    name: "field",
                    label: "Field",
                    placeholder: "e.g Computer science",
                    type: "text",
                  },
                  {
                    name: "institution",
                    label: "Institution",
                    placeholder: "e.g Oxford",
                    type: "text",
                  },
                  {
                    name: "start_date",
                    label: "Start date",
                    placeholder: "e.g 01/09/2021",
                    type: "date",
                  },
                ].map((field) => (
                  <FormField
                    key={field.name}
                    onChangeYourInfo={(e) => handleEducationChange(index, e)}
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    isEmpty={isEducationEmpty}
                    type={field.type}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  onChangeYourInfo={(e) => handleEducationChange(index, e)}
                  name="end_date"
                  label="End date"
                  placeholder="e.g 01/09/2021"
                  value={form.end_date}
                  isEmpty={isEducationEmpty}
                  type="date"
                  disabled={form.stillStudying}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="stillStudying"
                    checked={form.stillStudying}
                    onChange={(e) => handleEducationChange(index, e)}
                    className="mr-2"
                  />
                  <label className="text-sm">Still studying here</label>
                </div>
              </div>

              <FormField
                onChangeYourInfo={(e) => handleEducationChange(index, e)}
                name="description"
                label="Description"
                placeholder="Briefly describe what you learned"
                value={form.description}
                isEmpty={isEducationEmpty}
                type="long"
              />

              <button
                type="button"
                className="text-red-500 space-x-2 font-bold mt-4 rounded flex items-center"
                onClick={() => removeEducationForm(index)}
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
                Remove Education
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-4 text-blue-500 flex items-center font-bold space-x-2"
          onClick={addEducationInfo ? addEducationInfo : addEducationForm}
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
          Add Another Education
        </button>
      </form>
    </div>
  );
}
