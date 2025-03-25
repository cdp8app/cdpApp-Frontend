"use client";
import React from "react";
import "../../../app/globals.css";

interface Button2Props {
  text: string;
  className?: string;
}

const Button2: React.FC<Button2Props> = ({ text, className }) => {
  return <button className={`${className} bg-gradient-to-r py-[14px] font-sans font-normal text-GoldenWhite text-[17px] rounded-[30px] w-[100%]`}>
    {text}
  </button>;
};

export default Button2;
