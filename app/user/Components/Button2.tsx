"use client";
import React from "react";
import "../../../app/globals.css";
import Spinner from "@/app/Components/Spinner";

interface Button2Props {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button2: React.FC<Button2Props> = ({ text, className, onClick, type, loading = false,
  disabled = false, }) => {
  return <button type={type || "button"} className={`${className} bg-gradient-to-r py-[14px] font-sans font-normal text-GoldenWhite text-[17px] rounded-[30px] w-[100%]`} onClick={onClick}>
    {loading ? (
      <>
        <Spinner className="mx-auto" />
      </>
    ) : (
      text
    )}
  </button>;
};

export default Button2;
