"use client";
import "../../../../../app/globals.css";
import { useState } from "react";
import { useAuth } from "@/./contexts/AuthContext"; 
import Button1 from "@/app/user/Components/Button1";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const { resetPassword, loading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();

    try {
      await resetPassword(email);
    } catch (err: any) {
      setFormError(err.message || "Failed. Please check your e and try again.");
    } 
  };

  return (
    <form className="flex justify-start" onSubmit={handleSubmit}>
      <div className="flex w-[100%] flex-col justify-center">
        {(formError || error) && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
            {formError || error}
          </div>
        )}
        <div className=" flex w-[100%] flex-row items-center border-b-[2px] border-Blue3 px-[4.91px] py-[4.91px]">
          {/* <div className="mb-[121px] mt-[96px] flex w-[100%] flex-row items-center border-b-[2px] border-Blue3 px-[4.91px] py-[4.91px]"> */}
          {/* <Image src={emailIcon} alt="Phone" className="mr-[8px] w-[22.18px] h-[17.31px]" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="mr-[8px] h-[24px] w-[24px] text-Blue4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="font-sans text-[16px] w-[95%] placeholder-Gray1 outline-none"
          />
        </div>
        <div className=" flex justify-center item-center w-[100%]">
          <Button1 
            text="Send OTP" 
            className=" mt-24 text-[16px] w-[85%] "
            loading={loading}
            disabled={loading}
            type="submit" />
        </div>
      </div>
    </form>
  );
}
