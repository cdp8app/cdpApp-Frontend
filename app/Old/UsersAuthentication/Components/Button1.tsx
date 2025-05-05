// components/Button1.tsx
"use client";
import React from "react";
import "../../../../app/globals.css";
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
      className={`${className} bg-PriGold py-[14px] px-6 font-sans font-medium text-GoldenWhite text-lg rounded-[30px] w-[100%]`}
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