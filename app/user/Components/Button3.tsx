"use client";
import React from "react";
import "../../../app/globals.css";
import Spinner from "@/app/Components/Spinner";

interface Button3Props {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button3: React.FC<Button3Props> = ({ text, type, className, loading = false, disabled = false, onClick }) => {
  return <button type={type} onClick={onClick} disabled={loading || disabled} className={`${className} bg-gradient-to-r py-[24px] font-sans font-normal text-GoldenWhite text-[17px] rounded-[45px] w-[100%]`}>
    {loading ? (
      <>
        <Spinner className="mx-auto" />
      </>
    ) : (
      text
    )}
  </button>;
};

export default Button3;