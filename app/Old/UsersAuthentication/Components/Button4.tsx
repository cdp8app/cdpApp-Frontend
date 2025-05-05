"use client";
import React from "react";
import "../../../../app/globals.css";

interface Button4Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button4: React.FC<Button4Props> = ({ text, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-gradient-to-r py-[18px] font-sans font-normal text-GoldenWhite text-[16px]/[120%] rounded-[999px] w-[100%]`}
    >
      {text}
    </button>
  );
};

export default Button4;
