import React, { useState } from "react";

const ToggleSwitch: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`w-[36px] h-[20px] flex items-center bg-Gray2 rounded-[999px] p-1 cursor-pointer ${isOn ? "bg-PriGold" : "bg-Gray2"}`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-Gold3 w-[16px] h-[16px] rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? "translate-x-[12px]" : ""}`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
