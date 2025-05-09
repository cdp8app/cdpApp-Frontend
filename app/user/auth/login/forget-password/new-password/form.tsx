"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/./contexts/AuthContext"; 

import Label3 from "@/app/user/Components/Label3";
import "../../../../../../app/globals.css";
import Button2 from "@/app/user/Components/Button2";
import FormAlert from "@/app/Components/FormAlert";

export default function NewPasswordForm() {
  const router = useRouter();

  const { setNewPassword, loading, error, clearError } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    special: false,
    match: false
  });
  const [formError, setFormError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePasswords(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    validatePasswords(password, e.target.value);
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    setErrors({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[!&@#%^()":;<>?+,_'.\-*$/]/.test(password),
      match: password === confirmPassword
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    clearError();

    try {
      // Call the setNewPassword function from AuthContext
      if (!userId) {
        setFormError("User ID is missing. Please retry the reset process.");
        return;
      }
      await setNewPassword(userId as string, password, confirmPassword);
    } catch (err: any) {
      setFormError(err.message || "Failed to set new password.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col justify-start"
    >
      {(formError || error) && (
        <FormAlert
          message={(formError || error) ?? ""}
          type="error"
          duration={5000}
          onClose={() => {
            if (formError) {
              setFormError("");
            } else {
              clearError();
            }
          }}
        />
      )}
      <Label3
        text="Password"
        className="text-start text-[12px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="mr-[8px] h-[24px] w-[24px] text-Gold0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="w-[95%] font-sans text-[16px] placeholder-Gray1 outline-none"
        />
      </div>

      <Label3
        text="Confirm password"
        className="text-start text-[12px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="mr-[8px] h-[24px] w-[24px] text-Gold0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-[95%] font-sans text-[16px] placeholder-Gray1 outline-none"
        />
      </div>

      <div className="mt-[24px] flex flex-col items-center">
        <div className="flex items-center">
          {errors.length ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Green1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Gray1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span className="font-sans text-[16px]/[120%] text-Gray1">
            8 characters
          </span>
        </div>

        <div className="mt-2 flex items-center">
          {errors.lowercase ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Green1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Gray1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span className="font-sans text-[16px]/[120%] text-Gray1">
            At least 1 lowercase letter
          </span>
        </div>

        <div className="mt-2 flex items-center">
          {errors.uppercase ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Green1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Gray1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span className="font-sans text-[16px]/[120%] text-Gray1">
            At least 1 uppercase letter
          </span>
        </div>
        <div className="mt-2 flex items-center">
          {errors.special ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Green1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Gray1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span className="font-sans text-[16px]/[120%] text-Gray1">
            At least 1 special character (!&.-*$)
          </span>
        </div>

        <div className="mt-2 flex items-center">
          {errors.match ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Green1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-[10px] size-6 text-Gray1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span className="font-sans text-[16px]/[120%] text-Gray1">
            Passwords must match
          </span>
        </div>
      </div>
      <Button2 text="Set new password" className="mb-[14px] mt-[36px] w-[100%]" />
    </form>
  );
}
