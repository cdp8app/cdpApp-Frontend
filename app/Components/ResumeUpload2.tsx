// "use client";
// import React, { useState, useRef } from "react";

// const ResumeUploadButton2: React.FC = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setFileName(file.name);
//     } else {
//       setFileName(null);
//     }
//   };

//   const triggerFileInput = (e: React.MouseEvent) => {
//     e.preventDefault();
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div className="mt-[18px] mb-[16px] flex w-[100%] flex-row ">
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       <button
//         onClick={triggerFileInput}
//         type="button"
//         className="mb-[63px] border-Gold3 flex w-[100%] flex-col items-center rounded-[12px] border-[2px] px-[18px] py-[20px] font-sans text-[12px]/[120%] font-semibold text-Gray1 outline-none focus:border-[2px] focus:border-PriGold focus:outline-none"
//       >
//         <h1>NOT DONE: NEEDS TO BE FIXED</h1>
//         <div className="flex h-[75.58px] w-[76px] items-center justify-center rounded-[60px] bg-Gold3">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="size-5 text-Black1"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
//             />
//           </svg>
//         </div>
//         Upload your resume
//         <span className="font-normal text-PriGold">MAX SIZE: 5MB</span>
//         {fileName ? (
//           <div className="mt-[10px] text-gray-700">
//             <p>
//               Uploaded File: <span className="font-bold">{fileName}</span>
//             </p>
//           </div>
//         ) : (
//           <div className="mt-4 text-gray-500"></div>
//         )}
//       </button>
//     </div>
//   );
// };

// export default ResumeUploadButton2;
"use client";
import React, { useRef } from "react";
import "../../app/globals.css";
import Button6 from "../user/Components/Button6";
import ResumePdf from "../../public/Images/resume_pdf.png";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

type ResumeUploadButton2Props = {
  fileName: string;
  onUpload: (file: File) => Promise<void>;
  fileUrl: string
};

const ResumeUploadButton2: React.FC<ResumeUploadButton2Props> = ({
  fileName,
  onUpload,
  fileUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div className="mt-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] border-[1px] border-PriGold px-[40px] py-[20px]">
      <div className="mt-[10px] text-gray-700 flex items-center gap-2">
        {fileUrl ? (
          <>
            <CldImage
              width="50"
              height="50"
              src={fileUrl}
              alt="Description of my image"
            />
          </>
        ) : (
          <span className="text-sm text-gray-400">No resume uploaded</span>
        )}
      </div>

      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Button6
        text="Upload a resume"
        className="text-[12px]/[120%] font-normal"
        onClick={triggerFileInput}
      />
    </div>
  );
};

export default ResumeUploadButton2;
