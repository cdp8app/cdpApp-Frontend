"use client";
import Button4 from "@/app/user/Components/Button4";
import Link from "next/link";
import { useState } from "react";

interface EditAboutModalProps {
  currentText: string;
   
  onSave: (newText: string) => void;
  onClose: () => void;
}

const EditAboutModal: React.FC<EditAboutModalProps> = ({
  currentText,
  onSave,
  onClose
}) => {
  const [inputText, setInputText] = useState<string>(currentText);

  const handleSave = () => {
    onSave(inputText);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-Gray1 bg-opacity-70">
      <div className="w-[60%] rounded-[18px] bg-white">
        <div className="px-[10%] py-[55px] ">
          <div className="mb-[18px] flex flex-row border-b-[1px] border-Gold2">
            <button
              className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <Link
              className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
              href={"#"}
            >
              Edit About
            </Link>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className=" font-sans text-[16px]/[120%] overflow-hidden resize-none h-[130px] w-full rounded border border-Gold3 bg-GoldenWhite p-2"
          />
          <div className="mt-[20px] flex flex-col">
            {/* <Button4
              onClick={onClose}
              text="Cancel"
              className="text-[16px] font-normal"
            /> */}
            <Button4
              onClick={handleSave}
              text="Save"
              className="text-[16px] font-normal"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAboutModal;
