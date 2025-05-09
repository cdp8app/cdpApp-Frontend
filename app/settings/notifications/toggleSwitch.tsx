import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle }) => {
  return (
    <div
      className={`w-[36px] h-[20px] flex items-center rounded-[999px] p-1 cursor-pointer ${isOn ? "bg-PriGold" : "bg-Gray2"}`}
      onClick={onToggle}
    >
      <div
        className={`bg-Gold3 w-[16px] h-[16px] rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? "translate-x-[12px]" : ""}`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;