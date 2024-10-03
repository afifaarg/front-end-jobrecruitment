import React, { useEffect, useState } from "react";

export default function FormField({
  name,
  label,
  placeholder,
  onChangeYourInfo,
  type,
  value,
  isEmpty,
  options = [], // Add options to support select inputs
}) {
  const [displayRequired, setDisplayRequired] = useState("hidden");
  const [redBorder, setRedBorder] = useState("border-[#d6d9e6]");

  useEffect(() => {
    if (isEmpty === true) {
      setDisplayRequired("block");
      setRedBorder("border-[#ed3548]");
    }
  }, [isEmpty]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        <p
          className={`${displayRequired} font-medium text-[14px] text-[#ed3548]`}
        >
          This field is required
        </p>
      </div>
      <div>
        {type === "long" ? (
          <textarea
            id="txtArea"
            rows="10"
            cols="70"
            onChange={onChangeYourInfo}
            name={name}
            placeholder={placeholder}
            value={value}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
          ></textarea>
        ) : type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChangeYourInfo}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            onChange={onChangeYourInfo}
            name={name}
            className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
            type={type}
            placeholder={placeholder}
            value={value}
          />
        )}
      </div>
    </div>
  );
}
