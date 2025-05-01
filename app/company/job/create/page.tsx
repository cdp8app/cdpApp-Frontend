"use client";

import React from "react";
import SetUpJobForm from "./form";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SetUpJobPage = () => {
  const router = useRouter();

  return (
    <div >
      <div className="mb-[100px] p-[1.5%]">
        <Header1 />
        <div className="flex flex-col px-[20%] text-center">
          <div className="mb-[18px]">

            <button
              className="flex flex-row items-center py-[12px] font-sans text-[36px]/[120%] font-normal text-Gold1"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
                  Post a job
            </button>
            <p className="">Provide your job details below</p>
          </div>
          <div className="space-x-[16px]" >
            <SetUpJobForm />
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
    
  );
};

export default SetUpJobPage;
