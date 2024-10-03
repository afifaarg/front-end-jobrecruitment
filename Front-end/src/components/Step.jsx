import React, { useEffect, useState } from "react";

export default function Step({ number, title, active }) {
  const [bg, setBg] = useState("");

  useEffect(() => {
    if (active) setBg("bg-[#adbeff]");
    else setBg("");
  }, [active]);

  return (
    <div
      className={`flex items-center text-left space-x-4 text-white mx-4 ${
        active
          ? "sm:border-b  border-[#adbeff]"
          : "sm:border-b border-[#d6d9e6]"
      } p-2`}
    >
      <div
        className={`font-bold text-center p-2 w-10 h-10 rounded-full ${
          active ? "bg-[#adbeff]" : ""
        }`}
      >
        {number}
      </div>
      <div className="hidden md:block">
        <div className="font-bold text-white">{title}</div>
      </div>
    </div>
  );
}
