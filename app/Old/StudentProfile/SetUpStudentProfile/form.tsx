"use client";
import "../../../app/globals.css";
// import ResumeUploadButton from "./ResumeUpload/page";
// import SkillsButton from "./SelectDropdown";

export default function SetUpStudentProfileForm() {
  // const options = [
  //   { value: "option1", label: "Option 1" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   { value: "option4", label: "Option 4" },
  // ];

  return (
    <form className="flex flex-col justify-start">
      <h1>ADD THIS LATER</h1>
      <input
        placeholder="Enter your name"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Enter your phone number"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Tell us a little bit about yourself (Note: Recruiters will be able to see this information when you apply for internships)"
        className="mb-[12px] h-[100px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Education
        </h1>
      </div>
      <input
        placeholder="Institution"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Course of study"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Matric number"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="flex flex-row items-center justify-between">
        <input
          placeholder="Dates (MM/YYYY)"
          className="mb-[12px] w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
        />
        <div className="mb-[12px] h-[4px] w-[16px] bg-Gray1"></div>
        <input
          placeholder="Dates (MM/YYYY)"
          className="mb-[12px] w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
        />
      </div>
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Skills
        </h1>
      </div>
      {/* <SkillsButton options={options} /> */}
      {/* <SkillsButton options={options} onSelect={handleSelect} /> */}
      <h1>!!!Correct Soon!!!</h1>
      <input
        placeholder="Type or Select your skills (You can select up to 5)"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Resume
        </h1>
      </div>
      {/* <ResumeUploadButton /> */}
      <div className="mb-[100px]"></div>
    </form>
  );
}
