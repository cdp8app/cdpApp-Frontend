"use client";
import React from "react";
import Header1 from "@/app/Components/Header1";
import Footer1 from "@/app/Components/Footer1";
import Link from "next/link";

export default function CompanyJobApplicant() {
  return (
    <div>
      <div className="px-[3%] py-[1%]">
        <Header1 />
        <div className="px-[4%]">
          <Link
            className="flex flex-row items-center border-b-[1px] border-Gold3 py-[12px] font-sans text-[36px]/[120%] font-normal text-Gold1"
            href={"#"}
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
            Applicants
          </Link>
          <div className="mt-[21px]">
            <div className="flex max-w-[48%] flex-row items-center justify-between rounded-[15px] p-[18px] shadow-custom2">
              <div className="mr-[12px] h-[145px] w-[145px] rounded-full bg-Gray1 bg-opacity-30"></div>
              <div className="max-w-[73%]">
                <h1 className="mb-[1px] font-sans text-[16px]/[120%] text-Black2">
                  Samuel Edidiong
                </h1>
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-[5px] size-5 text-Gray1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                  <p className="font-sans text-[16px]/[80%] text-Gray1">
                    COMPUTER ENGINEERING
                  </p>
                </div>
                <p className="mb-[10px] mt-[4px] w-[98%] font-sans text-[12px]/[120%] font-normal text-Gray1">
                  This section should briefly show what the applicant entered in
                  the “Why are you interested in working with us” field, when
                  filling the application.
                </p>

                <Link
                  href={
                    "/CompanyDashboard/CompanyJobApplicant/CompanyJobApplicantInfo"
                  }
                  className="mr-[10px] w-[132px] rounded-[999px] bg-PriGold px-[30px] py-[12px] font-sans text-[12px]/[120%] text-GoldenWhite"
                >
                  View details
                </Link>
                <button className="w-[106px] rounded-[999px] border-[2px] border-Red1 px-[30px] py-[12px] font-sans text-[12px]/[120%] text-Red1">
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[91px]"></div>
      <Footer1 />
    </div>
  );
}
