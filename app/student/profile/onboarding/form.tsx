"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth, UserType } from "@/./contexts/AuthContext";
import { useStorageContext } from "@/contexts/storageContext";

import "../../../../app/globals.css";
import Image from "next/image";
import ResumeUploadButton from "./resume/page";
import SkillsButton from "./SelectDropdown";
import Button1 from "@/app/user/Components/Button1";


export default function SetUpStudentProfileForm() {
  const router = useRouter();

  const { updateProfile, loading, error, clearError } = useAuth();
  const [profile_picture, setProfilePicture] = useState<File | null>(null);
  const [full_name , setFullName] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [institution, setInstitution] = useState<string>("");
  const [course_of_study, setCourseOfStudy] = useState<string>("");
  const [reg_num, setRegNum] = useState<string>("");
  const [start_date, setStartDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const { uploadFile } = useStorageContext();
  const [user, setUser] = useState<string | null>(null);

  const [selectedSkills, setSelectedSkills] = useState();
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  useEffect(() => {
    const storedUserData = localStorage.getItem("data");
    if (storedUserData) {
      setUser(storedUserData);
    }
  }, []);

  const handleSelect = (value: string) => {
    if (!skills.includes(value) && skills.length < 5) {
      setSkills((prev) => [...prev, value]);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();

    // let profilePictureUrl = "";
    // let resumeUrl = "";

    // if (profile_picture) {
    //   const uploadResult = await uploadFile(profile_picture);
    //   if (typeof uploadResult === "string") {
    //     profilePictureUrl = uploadResult;
    //   } else {
    //     throw new Error("Failed to upload profile picture.");
    //   }
    // }

    // if (resume) {
    //   const uploadResult = await uploadFile(resume);
    //   if (typeof uploadResult === "string") {
    //     resumeUrl = uploadResult;
    //   } else {
    //     throw new Error("Failed to upload resume.");
    //   }
    // }

    const userData = {
      id: "unique-id",
      email: "user@example.com",
      userType: "student" as UserType,
      // profile_picture: profilePictureUrl,
      full_name,
      phone_number,
      bio,
      intuition: institution,
      course: course_of_study,
      reg_num,
      start_data: start_date,
      end_data: end_date,
      // resume: resumeUrl,
      skills: skills.join(","),
    };

    try {
      await updateProfile(userData);
      // Note: The redirect is handled inside the login function in AuthContext
    } catch (err: any) {
      // Form-specific errors are set here
      setFormError(err.message || "Login failed. Please check your credentials and try again.");
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start">
      {(formError || error) && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
          {formError || error}
        </div>
      )}
      <div
        className="mx-auto h-[150px] w-[150px] mb-[12px] rounded-[100%] border-[1px] border-Gold3 bg-GoldenWhite"
      >
        <label htmlFor="profile-picture-upload" className="cursor-pointer">
          {profile_picture ? (
            <Image
              src={URL.createObjectURL(profile_picture)}
              alt="Profile Picture"
              className="h-full w-full rounded-[100%] object-cover"
              width={150}
              height={150}
            />
          ) : (
            <Image
              src="/Images/Icons/profileIcon.png"
              alt="Profile Icon"
              className="h-full w-full rounded-[100%] object-cover"
              width={150}
              height={150}
            />
          )}
        </label>
        <input
          id="profile-picture-upload"
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={handleProfilePictureChange}
        />
      </div>
      <input
        placeholder="Enter your name"
        value={full_name}
        onChange={(e) => setFullName(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Enter your phone number"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Tell us a little bit about yourself (Note: Recruiters will be able to see this information when you apply for internships)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="mb-[12px] h-[100px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Education
        </h1>
      </div>
      <input
        placeholder="Institution"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Course of study"
        value={course_of_study}
        onChange={(e) => setCourseOfStudy(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Matric number"
        value={reg_num}
        onChange={(e) => setRegNum(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="flex flex-row items-center justify-between">
        <input
          placeholder="Dates (MM/YYYY)"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
          className="mb-[12px] w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
        />
        <div className="mb-[12px] h-[4px] w-[16px] bg-Gray1"></div>
        <input
          placeholder="Dates (MM/YYYY)"
          value={end_date}
          onChange={(e) => setEndDate(e.target.value)}
          className="mb-[12px] w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
        />
      </div>
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Skills
        </h1>
      </div>

      <SkillsButton options={options} onSelect={handleSelect} />

      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Resume
        </h1>
      </div>
      <div className="mt-[18px] mb-[60px] flex w-full flex-col items-center justify-between rounded-[16px] border border-Gold3 bg-GoldenWhite px-[40px] py-[20px]">
        <label htmlFor="resume-upload" className="cursor-pointer text-center">
          <div className="mx-auto mb-[12px] h-[60px] w-[60px] flex items-center justify-center rounded-full border border-Gold3 bg-GoldenWhite">              
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 text-PriGold"
              strokeWidth="2.0"
            >
              <path 
                d="m8 8 4-4 4 4"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"/>
              <path 
                d="M12 4v12M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17" 
                stroke="#000000" 
                strokeWidth="1.5" 
                strokeMiterlimit="10" 
                strokeLinecap="round"/>
            </svg>
          </div>
          <p className="font-sans text-[16px] text-Gray1">
      Upload your resume (optional)
          </p>
          <p className="text-[14px] text-PriGold font-sans text-[12px]/[120%]">MAX SIZE: 5MB</p>
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              if (file.size > 5 * 1024 * 1024) {
                alert("File is too large! Max size is 5MB.");
              } else {
                setResume(file);
              }
            }
          }}
        />
      </div>

      {/* <button type="submit" className="bg-gradient-to-r py-[14px] font-sans font-normal text-GoldenWhite text-[17px] rounded-[30px] w-[100%]" >
    Submit
      </button>; */}

      <Button1 text="Submit" type="submit" loading={loading} disabled={loading} />

      <ResumeUploadButton />
      
      <div className="mb-[100px]"></div>
    </form>
  );
}
