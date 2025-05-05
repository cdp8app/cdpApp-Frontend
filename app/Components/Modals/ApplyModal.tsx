"use client";

import { useApplicationContext } from "@/contexts/applicationContext";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { useRef, useState } from "react";
import { CldImage } from "next-cloudinary";
import { useStorageContext } from "@/contexts/storageContext";
// import { FaUpload } from "react-icons/fa";

// Define or import the Job type
interface Job {
    id: string
    title: string;
  company?: {
    id: string;
    company_name: string;
    company_industry: string;
    profile_picture: string;
  };
}

interface ApplyModalProps {
    onClose: () => void;
    job: Job;
  }

const ApplyModal: React.FC<ApplyModalProps> = ({ onClose, job  }) => {
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const { user } = useAuth();
  const [formError, setFormError] = useState("");
  const { uploadFile } = useStorageContext();
  const { createApplication, getApplications, error } = useApplicationContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    let resumeUrl = "";

    if (resume) {
      const uploadResult = await uploadFile(resume);
      if (uploadResult && typeof uploadResult === "object" && "file_url" in uploadResult) {
        resumeUrl = uploadResult.file_url;
      } else {
        setFormError("Failed to upload resume.");
      }
    } 

    try {
      const applicationData = {
        job_id: job.id,
        user: user?.id,
        cover_letter: message,
        // location: user?.location,
        description: message,
        resume: resumeUrl || undefined,
        employer: job.company?.id
      };

      await createApplication(applicationData);
      await getApplications();
    } catch (err: any) {
      setFormError(err.message || "Failed to create application.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-Gray1 bg-opacity-70 z-50">
      <div className="w-[90%] max-w-[600px] rounded-[12px] bg-white p-8 shadow-lg">
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
            {formError || error}
          </div>
        )}
        <h2 className="text-[24px] font-semibold text-Gold1 mb-6">Apply for {job.title}</h2>

        {/* Company Info */}
        <div className="flex items-center gap-4 bg-GoldenWhite rounded-[12px] p-4 mb-6">
          <div className="mb-[16px] h-[120px] w-[125px] rounded-[67px]overflow-hidden bg-White">
            {job?.company?.profile_picture ? (
              <CldImage
                width="120"
                height="120"
                src={job?.company?.profile_picture}
                alt="Description of my image"
              />
            ) : (
              <div className="mb-[16px] h-[120px] w-[120px] rounded-[12px] bg-Gray3"></div>
            )}
          </div>
          <div>
            <div className="text-black font-semibold">{job.company?.company_name}</div>
            <div className="text-Gray1 text-sm">{job.company?.company_industry}</div>
            <button className="mt-1 text-Gold1 border border-Gold1 rounded-full px-3 py-1 text-sm hover:bg-Gold1 hover:text-white">
              View company
            </button>
          </div>
        </div>

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
            className="mb-[20px] flex w-[100%] flex-col items-center rounded-[12px] border-[1px] border-Gold3 bg-GoldenWhite bg-white px-[18px] py-[20px] font-sans text-[12px]/[120%] font-semibold text-Gray1 outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
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
        </div>

        {/* Message Box */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Briefly, tell us why you’re interested in interning with us"
          className="w-full h-[120px] bg-GoldenWhite border border-Gold2 rounded-[10px] p-3 text-black mb-2 resize-none"
        />

        {/* Note */}
        <div className="flex items-center text-green-600 text-sm mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25v.008h.008V17.25H12z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75v6m0 3h.008v.008H12V15.75z"
            />
          </svg>
          Note: What you entered in the text field above will be visible to the hiring manager before they even open your application!
        </div>

        {/* Buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-Gold1 text-white px-6 py-3 rounded-full hover:bg-Gold2"
          >
            Send application
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L21 12l-3.75 5.25M3 12h18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
