"use client";
import React from "react";
import "../../../app/globals.css";

interface Button5Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button5: React.FC<Button5Props> = ({ text, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex flex-row items-center rounded-[999px] border-[2px] border-PriGold px-[60px] py-[14px] font-sans text-[17px]/[100%] font-normal text-PriGold`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 mr-[12px] text-PriGold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      {text}
    </button>
  );
};

export default Button5;
