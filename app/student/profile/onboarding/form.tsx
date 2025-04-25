"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth, UserType } from "@/./contexts/AuthContext";
import { useStorageContext } from "@/contexts/storageContext";

import "../../../../app/globals.css";
import Image from "next/image";
import SkillsButton from "./SelectDropdown";
import Button1 from "@/app/user/Components/Button1";
import Button3 from "@/app/user/Components/Button3";


export default function SetUpStudentProfileForm() {
  const router = useRouter();

  const { user, updateProfile, loading, error, clearError } = useAuth();
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
  // const [user, setUser] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {      
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large! Max size is 5MB.");
      } else {
        setResume(file);
      }
    }
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };
  
  const triggerFileInput = (e: React.MouseEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [selectedSkills, setSelectedSkills] = useState();
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ];

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userDate");
  //   console.log("storedUserData: ", user);
  //   if (storedUserData) {
  //     setUser(storedUserData);
  //   }
  // }, []);
  console.log("storedUserData: ", user);

  const handleSelect = (value: string) => {
    setSkills((prev) => [...prev, value]);
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

    try {
      if (!user?.id || !user?.email) {
        setFormError("User ID or email is missing.");
        return;
      }

      const userData = {
        id: user.id,
        email: user.email,
        userType: "student" as UserType,
        full_name,
        phone_number,
        bio,
        intuition: institution,
        course: course_of_study,
        reg_num,
        start_data: start_date,
        end_data: end_date,
        skills: skills.join(","),
      };

      await updateProfile(userData);
      // Note: The redirect is handled inside the login function in AuthContext
      console.log("✅ Profile update successful: ", userData);
      // Optionally show a success message or toast
      // toast.success("Profile updated successfully!");
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
              src="/Images/Icons/profile-default.png"
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
          placeholder="Dates (YYYY-MM-DD)"
          value={start_date}
          onChange={(e) => setStartDate(e.target.value)}
          className="mb-[12px] w-[45%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
        />
        <div className="mb-[12px] h-[4px] w-[16px] bg-Gray1"></div>
        <input
          placeholder="Dates (YYYY-MM-DD)"
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

      <SkillsButton options={options} selectedSkills={skills} onSelect={handleSelect} />

      <div className="flex w-[100%] flex-col items-center justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={triggerFileInput}
          type="button"
          className="mb-[63px] flex w-[100%] flex-col items-center rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite bg-white px-[18px] py-[20px] font-sans text-[12px]/[120%] font-semibold text-Gray1 outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
        >
          <div className="flex h-[75.58px] w-[76px] items-center justify-center rounded-[60px] bg-Gold3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-5 text-Black1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
        Upload your resume
          <span className="font-normal text-PriGold">MAX SIZE: 5MB</span>
          {fileName ? (
            <div className="mt-[10px] text-gray-700">
              <p>
              Uploaded File: <span className="font-bold">{fileName}</span>
              </p>
            </div>
          ) : (
            <div className="mt-4 text-gray-500"></div>
          )}
        </button>
        <Button3 text="Create Profile" className="text-[16px] font-normal" type="submit" loading={loading} disabled={loading} />
        {/* {fileName ? (
                <div className="mt-4 text-gray-700">
                    <p>Uploaded File: <span className="font-bold">{fileName}</span></p>
                </div>
            ) : (
                <div className="mt-4 text-gray-500">No file uploaded yet.</div>
            )} */}
      </div>
      
      <div className="mb-[100px]"></div>
    </form>
  );
}
