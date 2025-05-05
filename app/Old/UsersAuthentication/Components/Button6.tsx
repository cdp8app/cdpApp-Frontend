"use client";
import React from "react";
import "../../../../app/globals.css";

interface Button6Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button6: React.FC<Button6Props> = ({ text, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex flex-row items-center rounded-[999px] border-[2px] border-PriGold px-[30px] py-[14px] font-sans font-normal text-PriGold`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="mr-[12px] size-5 text-PriGold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>

      {text}
    </button>
  );
};

export default Button6;
