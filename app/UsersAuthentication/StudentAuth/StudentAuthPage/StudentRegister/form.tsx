"use client";
import "../../../../../app/globals.css";
import Label2 from "@/app/UsersAuthentication/Components/Label2";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; 
import Button1 from "../../../Components/Button1";

export default function StudentRegisterForm() {
  const [userData, setUserData] = useState<{ email: string; password: string; confirm_password: string; role: string; username: string }>({
    email: "",
    password: "",
    confirm_password: "",
    role: "Student",
    username: "ben_ben",
  });
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(userData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start">
      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <Label2
        text="Email"
        className="text-start font-sans text-[13px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={emailIcon} alt="Phone" className="mr-[8px] w-[22.18px] h-[17.31px]" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="mr-[8px] h-[24px] w-[24px] text-Gold0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
        <input
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Enter your email address"
          className="font-sans text-[16px] placeholder-Gray1 outline-none"
        />
      </div>
      <Label2
        text="Password"
        className="text-start font-sans text-[13px] font-medium text-Blue4"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={passwordIcon} alt="password" className="mr-[8px] w-[16px] h-[20px]" /> */}
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
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          type="password"
          placeholder="Create password"
          className="w-[95%] font-sans text-[16px] placeholder-Gray1 outline-none"
        />
      </div>
      <Label2
        text="Confirm Password"
        className="text-start font-sans text-[13px] font-medium text-Blue4"
      />
      <div className="width-[100%] mb-[36px] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
        {/* <Image src={passwordIcon} alt="password" className="mr-[8px] w-[16px] h-[20px]" /> */}
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
          value={userData.confirm_password}
          onChange={(e) => setUserData({ ...userData, confirm_password: e.target.value })}
          type="password"
          placeholder="Re-enter password"
          className="w-[95%] font-sans text-[16px] placeholder-Gray1 outline-none"
        />
      </div>

      <Button1
        text="Register"
        loading={loading}
        disabled={loading}
        type="submit"
      />
    </form>
  );
}
