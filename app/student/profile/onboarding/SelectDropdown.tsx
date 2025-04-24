import React, { useState } from "react";

type DropdownOption = {
    value: string;
    label: string;
};

interface SkillsButtonProps {
    options: DropdownOption[];
    onSelect?: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }

const SkillsButton: React.FC<SkillsButtonProps> = ({
  options,
  onSelect,
  onKeyDown,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    setIsDropdownVisible(false);
    if (onSelect) onSelect(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedOption(null);
  };

  return (
    <div className="relative w-[100%]">
      <button
        type="button"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none text-left"
        onClick={toggleDropdown}
      >
        <span className="text-Gray1 text-[16px]/[120%]">
          {selectedOption ? options.find((option) => option.value === selectedOption)?.label : "Type or Select your skills (You can select up to 5)"} 
        </span>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-Gray1 text-[16px]/[120%]">
          {isDropdownVisible ? "▲" : "▼"}
        </span>
      </button>

      {isDropdownVisible && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <input
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onKeyDown={onKeyDown || (() => {})}
            className="w-full p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <ul className="max-h-48 overflow-y-auto">
            {options
              .filter((option) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {option.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillsButton;
