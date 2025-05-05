"use client";
import React from "react";
import "../../../../app/globals.css";

interface Button7Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button7: React.FC<Button7Props> = ({ text, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex flex-row items-center rounded-[999px] border-[2px] border-PriGold px-[60px] py-[14px] font-sans text-[17px]/[100%] font-normal text-PriGold`}
    >
      {text}
    </button>
  );
};

export default Button7;
