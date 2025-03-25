// import React, { useState } from "react";

// type DropdownOption = {
//     // value: string;
//     label: string;
// };

// interface SkillsButtonProps {
//     options: DropdownOption[];
//     onSelect?: (value: string) => void;
// }

// const SkillsButton: React.FC<SkillsButtonProps> = ({
//   options,
//   // onSelect,
// }) => {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);

//   const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

//   const handleOptionSelect = (value: string) => {
//     setSelectedOption(value);
//     setIsDropdownVisible(false);
//     if (onSelect) onSelect(value);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//     setSelectedOption(null);
//   };

//   return (
//     <div className="relative w-[100%]">
//       <button
//         className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
//         onClick={toggleDropdown}
//       >
//         {selectedOption || inputValue || "Type or Select your skills (You can select up to 5)"}
//       </button>

//       {isDropdownVisible && (
//         <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//           <input
//             type="text"
//             placeholder="Type here..."
//             value={inputValue}
//             onChange={handleInputChange}
//             className="w-full p-2 border-b border-gray-300 rounded-t-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <ul className="max-h-48 overflow-y-auto">
//             {options
//               .filter((option) =>
//                 option.label.toLowerCase().includes(inputValue.toLowerCase())
//               )
//               .map((option) => (
//                 <li
//                   key={option.value}
//                   onClick={() => handleOptionSelect(option.value)}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                 >
//                   {option.label}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillsButton;
