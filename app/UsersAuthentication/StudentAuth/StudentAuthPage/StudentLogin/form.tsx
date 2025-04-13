"use client";
import "../../../../../app/globals.css";
import Label from "@/app/UsersAuthentication/Components/Label";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext"; 

export default function StudentLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[12.96px] flex flex-col justify-start">
      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      
      <Label
        text="Email"
        className="text-start font-sans text-[12px] font-medium text-Gold0"
      />
      <div className="width-[100%] mt-[8px] flex flex-row items-center border-b-[2px] border-Gold3 px-[4.91px] py-[4.91px]">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email address"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          required
        />
      </div>
      
      <Label
        text="Password"
        className="mt-4 text-start font-sans text-[12px] font-medium text-Gold0"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="w-full font-sans text-[16px] placeholder-Gray1 outline-none"
          required
        />
      </div>
      
      <div className="mt-2 flex justify-end">
        <Link href="/forgot-password" className="text-sm text-Gold0 hover:underline">
          Forgot Password?
        </Link>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-md bg-Gold0 px-4 py-2 font-sans font-medium text-white transition duration-200 hover:bg-Gold1 focus:outline-none disabled:bg-Gold3"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-Gold0 hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
}