"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button2 from "@/app/user/Components/Button2";


export default function SuccessfulRegistrationPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "company" | null>(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "student" || storedUserType === "company") {
      setUserType(storedUserType);
    }
  }, []);

  useEffect(() => {
    if (!userType) return;

    const timer = setTimeout(() => {
      if (userType === "student") {
        router.push("/student/profile/");
      } else if (userType === "company") {
        router.push("/company/profile/");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, userType]);

  return (
    <div className="p-[1%] max-h-[screen]">
      <div className=" flex justify-center h-[100%] w-[100%]">
        <div className=" flex flex-col justify-center py-[10%] items-center w-[80%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-[100px] w-[100px] text-Green1 mb-[27px]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h2 className="text-center text-Gold0 text-[27px]/[120%] font-sans font-medium">
            New account successfully created!
          </h2>
          <p className="w-[60%] flex flex-col text-center mt-[16px] text-Gray1 text-[16px]/[120%] font-sans font-normal">
            Hurray! You have successfully created an account. You&apos;ll be
          </p>
          <div className="flex flex-row mb-[90px]">
            <p className="text-Gray1 text-[16px]/[120%] font-sans font-normal mr-1">
              redirected to&nbsp;
            </p>
            <p className="text-Gold1 text-[16px]/[120%] font-sans font-normal mr-1">
              set up your profile
            </p>
            <p className="text-Gray1 text-[16px]/[120%] font-sans font-normal">&nbsp;in</p>
            <p className="text-Gold1 text-[16px]/[120%] font-sans font-normal mr-1">
              &nbsp;3 seconds
            </p>
            <p className="text-Gray1 text-[16px]/[120%] font-sans font-normal">
              or click the button below.
            </p>
          </div>
          <Button2 text="Set up profile" className=" w-[40%] " />
        </div>

      </div>
    </div>
  );
}
