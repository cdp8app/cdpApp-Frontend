// components/Button1.tsx
"use client";
import React from "react";
import "../../../app/globals.css";
import Spinner from "@/app/Components/Spinner";

interface Button1Props {
  text: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button1: React.FC<Button1Props> = ({
  text,
  className = "",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`mt-6 rounded-[30px] bg-PriGold py-[14px] px-[193px] font-sans font-medium text-GoldenWhite text-[17px] w-[100%] flex items-center justify-center gap-2 transition duration-200 hover:bg-Gold1 focus:outline-none disabled:bg-Gold3 ${className}`}
    >
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button1;
