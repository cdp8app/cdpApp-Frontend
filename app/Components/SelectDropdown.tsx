import React, { useState } from "react";

type DropdownOption = {
  value: string;
};

interface SelectDropDownProps {
  options: DropdownOption[];
  onSelect?: (value: string) => void;
  selectedOption?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  text?: string;
}

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  options,
  onSelect,
  selectedOption = "",
  onKeyDown,
  text,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  const handleOptionSelect = (value: string) => {
    if (onSelect && value !== selectedOption) {
      onSelect(value);
      setInputValue("");
      setIsDropdownVisible(false); // close after selection
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const selectedLabel = options.find((opt) => opt.value === selectedOption);

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="mb-3 w-full rounded-[12px] border border-Gold3 bg-GoldenWhite px-4 py-3 font-sans text-[16px] text-left outline-none focus:border-2 focus:border-PriGold"
        onClick={toggleDropdown}
      >
        <span className={selectedLabel ? "text-black" : "text-Gray1"}>
          {selectedLabel ? selectedLabel.value : text}
        </span>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-Gray1">
          {isDropdownVisible ? "▲" : "▼"}
        </span>
      </button>

      {isDropdownVisible && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="max-h-48 overflow-y-auto">
            {options
              .filter((option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {option.value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;
