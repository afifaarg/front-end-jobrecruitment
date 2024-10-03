import React, { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

export default function Skills({ skills, onChangeSkill, isSkillsEmpty }) {
  const [inputValue, setInputValue] = useState("");
  const [errorDisplay, setErrorDisplay] = useState("invisible");

  useEffect(() => {
    if (isSkillsEmpty || skills.length === 0) {
      setErrorDisplay("block");
    } else {
      setErrorDisplay("invisible");
    }
  }, [isSkillsEmpty, skills]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      const newSkills = [...skills, inputValue.trim()];
      onChangeSkill(newSkills); // Update skills in the parent component
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    onChangeSkill(newSkills); // Update skills in the parent component
  };

  return (
    <div>
      <SectionHeading
        title="Select your skills"
        desc="Enter your skills below and press Enter."
      />
      <div className="flex flex-col">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Local input state
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
          className="border p-2 rounded-lg mb-4"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-2 py-1 rounded-full flex items-center"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 text-white"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <div
          className={`${errorDisplay} font-medium text-[#ed3548] mt-5 text-center`}
        >
          Please enter at least one skill!
        </div>
      </div>
    </div>
  );
}
