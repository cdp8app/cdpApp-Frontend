"use client";
import "../../../app/globals.css"
import ResumeUploadButton from "./ResumeUpload/page";
import SkillsButton from "./SelectDropdown";

export default function SetUpStudentProfileForm() {
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
    ];

    const handleSelect = (value: string) => {
        console.log("Selected:", value);
    };
    return (
        <form className="flex flex-col justify-start">
            <h1>ADD THIS LATER</h1>
            <input
                placeholder="Enter your name"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <input
                placeholder="Enter your phone number"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <input
                placeholder="Tell us a little bit about yourself (Note: Recruiters will be able to see this information when you apply for internships)"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] h-[100px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <div className='border-b-2 border-Gray1 mb-[12px]'>
                <h1 className='p-[10px] text-Gray1 font-sans text-[21px]/[120%] '>
                    Education
                </h1>
            </div>
            <input
                placeholder="Institution"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <input
                placeholder="Course of study"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <input
                placeholder="Matric number"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <div className=" flex justify-between flex-row items-center">
                <input
                    placeholder="Dates (MM/YYYY)"
                    className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[45%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
                />
                <div className="h-[4px] w-[16px] mb-[12px] bg-Gray1"></div>
                <input
                    placeholder="Dates (MM/YYYY)"
                    className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[45%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
                />
            </div>
            <div className='border-b-2 border-Gray1 mb-[12px]'>
                <h1 className='p-[10px] text-Gray1 font-sans text-[21px]/[120%] '>
                    Skills
                </h1>
            </div>
            <SkillsButton options={options} onSelect={handleSelect} />
            <h1>!!!Correct Soon!!!</h1>
            <input
                placeholder="Type or Select your skills (You can select up to 5)"
                className=" bg-GoldenWhite caret-PriGold border-[1px] mb-[12px] border-Gold3 font-sans w-[100%] rounded-[12px] py-[20px] px-[18px] text-[16px]/[120%] placeholder-Gray1 outline-none focus:border-PriGold focus:border-[2px] focus:outline-none"
            />
            <div className='border-b-2 border-Gray1 mb-[12px]'>
                <h1 className='p-[10px] text-Gray1 font-sans text-[21px]/[120%] '>
                    Resume
                </h1>
            </div>
            <ResumeUploadButton />
            <div className="mb-[100px]"></div>
        </form>
    );
}
