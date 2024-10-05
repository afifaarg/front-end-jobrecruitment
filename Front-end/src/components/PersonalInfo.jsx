import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

export default function PersonalInfo({ yourInfo, onChangeYourInfo, isEmpty }) {
  const [formFields, setFormFields] = useState([
    // {
    //   id: 1,
    //   name: "profile_pic",
    //   type: "file",
    //   label: "Profile Picture",
    //   placeholder: "Upload your profile picture",
    // },
    {
      id: 2,
      name: "gender",
      type: "select",
      label: "Gender",
      options: [
        { value: "", label: "Select Gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: 3,
      name: "birth_Date",
      type: "date",
      label: "Birth Date",
      placeholder: "Select your birth date",
    },
    {
      id: 4,
      name: "description",
      type: "long",
      label: "Description",
      placeholder: "Describe yourself",
    },
  ]);

  return (
    <div>
      <SectionHeading
        title="General Informations"
        desc="Please fill in the below form."
      />
      <form>
        <div className="flex flex-col space-y-6 text-[14px]">
          {formFields.map((formField) => (
            <FormField
              onChangeYourInfo={onChangeYourInfo}
              key={formField.id}
              name={formField.name}
              label={formField.label}
              placeholder={formField.placeholder}
              value={yourInfo[formField.name]}
              type={formField.type}
              options={formField.options} // Pass options for select fields
              isEmpty={isEmpty}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
