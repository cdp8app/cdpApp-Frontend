"use client";
import Button3 from "@/app/user/Components/Button3";
import React, { useState, useRef } from "react";

const ResumeUploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  return (
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
      <Button3 text="Create Profile" className="text-[16px] font-normal" />
      {/* {fileName ? (
                <div className="mt-4 text-gray-700">
                    <p>Uploaded File: <span className="font-bold">{fileName}</span></p>
                </div>
            ) : (
                <div className="mt-4 text-gray-500">No file uploaded yet.</div>
            )} */}
    </div>
  );
};

export default ResumeUploadButton;
