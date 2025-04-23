"use client";
import { useState } from "react";
import Button2 from "../../Components/Button2";
import Logo from "@/app/Components/Logo";

const BestDescribes = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // console.log("Selected option:", option);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className=" flex flex-col justify-between items-center text-center h-[80%]">
        <Logo />
        <div>
          <h2 className="text-center font-sans text-[27px]/[120%] mb-2 font-normal text-Black2">
                        Which best describes you?
          </h2>
          <h6 className="font-sans mt-[15px] text-center text-[21px]/[120%] text-Gold1">
                        Are you here to find internships as a student or to hire
            <br />
                        talent as an organization?
          </h6>
        </div>
        <div className="flex flex-row">
          <button
            className={`flex items-center justify-center ${selectedOption === "Student" ? "bg-Gold3" : "bg-Gray1 bg-opacity-30"} mr-[24px] text-Black2 py-[30px] px-[20px] w-[375px] h-[105px] flex items-center rounded-[18px]`}
            onClick={() => handleOptionSelect("Student")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>

            <span className='ml-[12px] font-sans text-[21px]/[120%] text-Black2'>Student</span>
          </button>
          <button
            className={`flex items-center justify-center ${selectedOption === "Organization" ? "bg-Gold3" : "bg-Gray1 bg-opacity-30"} mr-[24px] h-[105px] flex items-center text-Black2 py-[30px] px-[20px] w-[375px] rounded-[18px]`}
            onClick={() => handleOptionSelect("Organization")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
            <span className='ml-[12px] font-sans text-[21px]/[120%] text-Black2'>Organization</span>
          </button>
        </div>
        <Button2 text="Proceed to setup profile" className="mb-[14px] mt-[36px] w-[70%]" />
      </div>
    </div>
  );
};

export default BestDescribes;
