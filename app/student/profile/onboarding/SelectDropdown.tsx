import React, { useState } from "react";

type DropdownOption = {
  value: string;
  label: string;
};

interface SkillsButtonProps {
  options: DropdownOption[];
  onSelect?: (value: string) => void;
  selectedSkills?: string[];
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  text?: string
}

const SkillsButton: React.FC<SkillsButtonProps> = ({
  options,
  onSelect,
  onKeyDown,
  selectedSkills = [],
  text,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  const handleOptionSelect = (value: string) => {
    if (onSelect && !selectedSkills.includes(value) && selectedSkills.length < 5) {
      onSelect(value);
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const selectedLabels = options.filter((opt) =>
    selectedSkills.includes(opt.value)
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="mb-3 w-full rounded-[12px] border border-Gold3 bg-GoldenWhite px-4 py-3 font-sans text-[16px] text-left outline-none focus:border-2 focus:border-PriGold"
        onClick={toggleDropdown}
      >
        {selectedLabels.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map((skill) => (
              <span
                key={skill.value}
                className="bg-Gold3 text-white px-2 py-1 rounded-full text-sm"
              >
                {skill.label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-Gray1">
            {text}
          </span>
        )}
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-Gray1">
          {isDropdownVisible ? "▲" : "▼"}
        </span>
      </button>

      {isDropdownVisible && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <input
            type="text"
            placeholder="Type here..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
          />
          <ul className="max-h-48 overflow-y-auto">
            {options
              .filter(
                (option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
                  !selectedSkills.includes(option.value)
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
