"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface JobFormProps {
  onSubmit: (jobData: any) => Promise<void>;
  isLoading: boolean;
  initialData?: any;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, isLoading, initialData = {} }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [jobType, setJobType] = useState(initialData.job_type || "Full-time");
  const [description, setDescription] = useState(initialData.description || "");
  const [requirements, setRequirements] = useState(initialData.requirements || "");
  const [salary, setSalary] = useState(initialData.salary?.toString() || "");
  const [deadline, setDeadline] = useState<Date | null>(
    initialData.deadline ? new Date(initialData.deadline) : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !location || !jobType || !description || !requirements || !salary || !deadline) {
      alert("Please fill in all required fields");
      return;
    }

    const jobData = {
      title,
      location,
      job_type: jobType,
      description,
      requirements,
      salary: parseFloat(salary),
      deadline: deadline?.toISOString().split("T")[0], // Format as YYYY-MM-DD
      status: "open"
    };

    onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
        <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
          Job Details
        </h1>
      </div>
      
      {/* Job Title */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          JOB TITLE*
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter job title"
          className="w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
          required
        />
      </div>
      
      {/* Location */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          LOCATION*
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter job location (e.g., Remote, New York, NY)"
          className="w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
          required
        />
      </div>
      
      {/* Job Type */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          JOB TYPE*
        </label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] text-Black2 outline-none focus:border-[2px] focus:border-PriGold"
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>
      
      {/* Description */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          JOB DESCRIPTION*
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter detailed job description"
          className="w-full h-[200px] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
          required
        />
      </div>
      
      {/* Requirements */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          REQUIREMENTS*
        </label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Enter job requirements and qualifications"
          className="w-full h-[150px] rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
          required
        />
      </div>
      
      {/* Salary */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          SALARY (USD)*
        </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Enter annual salary (e.g., 75000)"
          className="w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
          required
        />
      </div>
      
      {/* Application Deadline */}
      <div>
        <label className="block mb-2 font-sans text-[16px]/[120%] text-Gold1">
          APPLICATION DEADLINE*
        </label>
        <div className="relative">
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select deadline date"
            className="w-full rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite px-[18px] py-[20px] font-sans text-[16px]/[120%] placeholder-Gray1 caret-PriGold outline-none focus:border-[2px] focus:border-PriGold"
            required
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-[999px] bg-gradient-to-r from-PriGold to-Gold1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Post Job"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;