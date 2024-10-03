import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";

export default function YourInfo({ yourInfo, onChangeYourInfo, isEmpty }) {
  const [formFields, setFormFields] = useState([
    {
      id: 1,
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g Harry Potter",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "e.g harry@gmail.com",
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "e.g +91 234 567 890",
    },
    {
      id: 4,
      name: "country",
      type: "text",
      label: "Country",
      placeholder: "e.g India",
    },
    {
      id: 5,
      name: "city",
      type: "text",
      label: "City",
      placeholder: "e.g Mumbai",
    },
    {
      id: 6,
      name: "description",
      type: "long",
      label: "Description",
      placeholder: "Describe Your self",
    },
  ]);

  // useEffect(() => {
  //   console.log(isEmpty);
  // }, [isEmpty]);

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
              isEmpty={isEmpty}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
