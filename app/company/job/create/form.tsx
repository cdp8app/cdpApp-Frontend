"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import "../../../../app/globals.css";
import Button1 from "@/app/user/Components/Button1";
import Button3 from "@/app/user/Components/Button3";
import { useAuth } from "@/contexts/AuthContext";
import { useJobContext } from "@/contexts/jobContext";


export default function SetUpJobForm() {
  const router = useRouter();
  const { user, clearError } = useAuth();

  const { createJob, loading, error } = useJobContext();
  const [title , setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirements] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [salary, setSalary] = useState<string>("");
  const [duration, setDuration] = useState<string | null>("");
  const [jobType, setJobType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    try {
      const jobData = {
        company: user?.id,
        title,
        description,
        requirements,
        location: address1+" "+state+" "+country,
        salary,
        deadline: duration,
        jobType,
      };

      await createJob(jobData);
    } catch (err: any) {
      setFormError(err.message || "Failed to create job.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start">
      {(formError || error) && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
          {formError || error}
        </div>
      )}
      <div className='border-b-2 border-Gray1 mb-[12px]'>
        <h1 className='p-[10px] text-Gray1 font-sans text-[21px]/[120%] text-start'>
        Job information*
        </h1>
      </div>
      <input
        placeholder="Job title"
        value={title} onChange={(e) => setTitle(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      {/* <input
        placeholder="Company"
        value={companyName} onChange={(e) => setCompanyName(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      /> */}
      <input
        placeholder="Enter job description"
        value={description} onChange={(e) => setDescription(e.target.value)}
        className="mb-[12px] h-[100px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Enter Requirements"
        value={requirements} onChange={(e) => setRequirements(e.target.value)}
        className="mb-[12px] h-[100px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1 text-start">
          Job type
        </h1>
      </div>
      <input
        placeholder="Enter job type"
        value={jobType} onChange={(e) => setJobType(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1 text-start">
          Location
        </h1>
      </div>
      {/* <input
        placeholder="Remote"
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      /> */}
      <input
        placeholder="Address line 1"
        value={address1} onChange={(e) => setAddress1(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      {/* <input
        placeholder="Address line 2"
        value={address2} onChange={(e) => setAddress2(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      /> */}
      <input
        placeholder="State"
        value={state} onChange={(e) => setState(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <input
        placeholder="Country"
        value={country} onChange={(e) => setCountry(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1 text-start">
          Salary
        </h1>
      </div>
      <input
        placeholder="Enter salary"
        value={salary} onChange={(e) => setSalary(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />
      <div className="mb-[12px] border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1 text-start">
          Duration
        </h1>
      </div>
      <input
        placeholder="Enter job duration"
        value={duration || ""} onChange={(e) => setDuration(e.target.value)}
        className="mb-[12px] w-[100%] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
      />

      <Button3 text="Create Job" className="text-[16px] font-normal" type="submit" />
      
      <div className="mb-[100px]"></div>
    </form>
  );
}
