"use client";
import { useState } from "react";
import Logo from "@/app/Components/Logo";
import StudentAuthTogglePage from "../auth/toggle/page";
import "../../../app/globals.css";

export default function StudentAuthPage() {
  const [activeContent, setActiveContent] = useState<1 | 2>(1);

  const handleToggle = (content: 1 | 2) => {
    setActiveContent(content);
  };

  return (
    <div>
      <div className="flex h-screen w-screen max-w-[100%] flex-row justify-between p-[1%]">
        <div className="h-[100%] lg:w-[50%] p-[10px] md:w-[100%] ">
          <Logo />
          <div className="mt-[29px] flex flex-col items-center">
            <h1 className="hidden md:block font-sans text-[21px]/[120%]">Welcome!</h1>
            <StudentAuthTogglePage activeContent={activeContent} onToggle={handleToggle} />
          </div>
        </div>
        <div className="hidden lg:flex h-screen w-[50%] rounded-[15px] relative overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/OnboardingBG.png')" }}
          ></div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black opacity-40"></div>

          {/* Text content */}
          <div className="relative z-10 flex flex-col justify-end px-[10%] pb-[10%] text-white">
            <h1 className="mb-[4px] font-sans text-[40px] font-semibold">
              {activeContent === 1 ? "Login to Career X Hub" : "Sign Up to Career X Hub"}
            </h1>
            <p className="font-sans text-[20px] font-light">Lorem Ipsum is simply</p>
          </div>
        </div>
      </div>
    </div>
  );
}
