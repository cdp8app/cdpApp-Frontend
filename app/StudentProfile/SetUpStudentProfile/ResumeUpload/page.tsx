import Button1 from '@/app/UsersAuthentication/Components/Button1';
import React, { useState, useRef } from 'react';

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
        <div className="flex flex-col items-center justify-center w-[100%]">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <button
                onClick={triggerFileInput}
                type="button"
                className="flex flex-col items-center font-semibold text-[12px]/[120%] text-Gray1 border-[1px] mb-[63px] border-Blue3 font-sans w-[100%] rounded-[12px] bg-white py-[20px] px-[18px] outline-none focus:border-Blue2 focus:border-[2px] focus:outline-none"
            >
                <div className='bg-Blue3 flex rounded-[60px] w-[76px] h-[75.58px] justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="size-5 text-Black1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                </div>
                Upload your resume
                <span className='text-Blue2 font-normal'>
                    MAX SIZE: 5MB
                </span>
                {fileName ? (
                    <div className="mt-[10px] text-gray-700">
                        <p>Uploaded File: <span className="font-bold">{fileName}</span></p>
                    </div>
                ) : (
                    <div className="mt-4 text-gray-500"></div>
                )}
            </button>
            <Button1 text="Create Profile" className=" text-[16px] font-normal " />
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
