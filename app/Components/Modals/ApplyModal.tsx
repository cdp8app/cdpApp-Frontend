"use client";

import { useApplicationContext } from "@/contexts/applicationContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
// import { FaUpload } from "react-icons/fa";

// Define or import the Job type
interface Job {
    id: string
    title: string;
  company?: {
    id: string;
    company_name: string;
    company_industry: string;
  };
}

interface ApplyModalProps {
    onClose: () => void;
    job: Job;
  }

const ApplyModal: React.FC<ApplyModalProps> = ({ onClose, job  }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const [formError, setFormError] = useState("");

  console.log("User from model: ", user);
  console.log("Job from model: ", job);

  const { createApplication, getApplications, error } = useApplicationContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    try {
      const applicationData = {
        job: job.id,
        user: user?.id,
        // cover_letter: string,
        // location: user?.location,
        description: message,
        //   resume: string
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
          <div className="w-14 h-14 bg-gray-300 rounded-md" />
          <div>
            <div className="text-black font-semibold">{job.company?.company_name}</div>
            <div className="text-Gray1 text-sm">{job.company?.company_industry}</div>
            <button className="mt-1 text-Gold1 border border-Gold1 rounded-full px-3 py-1 text-sm hover:bg-Gold1 hover:text-white">
              View company
            </button>
          </div>
        </div>

        {/* Resume Upload */}
        {resumeFile ? (
          <div className="flex items-center gap-2 mb-4">
            <img src="/pdf-icon.png" alt="PDF" className="w-6 h-6" />
            <span className="text-black">My resume</span>
            <span className="text-sm text-gray-500">(Doc type: {resumeFile.type})</span>
          </div>
        ) : null}

        <label className="flex flex-col items-center justify-center border-2 border-dashed border-Gold2 rounded-[10px] p-4 cursor-pointer text-Gold1 mb-6 hover:bg-GoldenWhite">
          {/* <FaUpload className="text-2xl mb-2" /> */}
          <span>Upload a resume</span>
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
        </label>

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
