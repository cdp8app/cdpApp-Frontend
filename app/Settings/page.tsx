"use client";
import React from "react";
import Footer1 from "../Components/Footer1";
import Header1 from "../Components/Header1";
import Link from "next/link";

export default function Settings() {
  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="px-[7%]">
          <div className="mb-[31px] border-b-[2px] border-Gold3 p-[10px]">
            <h1 className="font-sans text-[36px]/[120%] text-Gold1">
              Settings
            </h1>
          </div>
          <div className="mb-[31px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Profile settings
            </h1>
          </div>
          <div className="mb-[18px] flex w-[100%] flex-row items-center justify-between rounded-[16px] bg-Gold3 p-[30px]">
            <div className="flex flex-row items-center">
              <div className="mr-[24px] h-[120px] w-[120px] rounded-[60px] bg-White"></div>
              <div>
                <h1 className="mb-1 font-sans text-[36px]/[100%] font-semibold text-Gold1">
                  John Doe
                </h1>
                <h2 className="flex flex-row font-sans text-[16px] text-Gold1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="mr-[11px] size-6 text-Gold1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                  Med/surgery
                </h2>
              </div>
            </div>
            <div>
              <button className="rounded-[999px] border-2 border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] text-PriGold">
                Go to profile
              </button>
            </div>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Security
            </h1>
          </div>
          <div className="flex flex-col">
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Change password
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Change email address
            </Link>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Privacy & data controls
            </h1>
          </div>
          <div className="flex flex-col">
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Profile visibilty
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Manage data sharing
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Personalized recommendations
            </Link>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Notification preferences
            </h1>
          </div>
          <div className="flex flex-col">
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Customize notifications
            </Link>
          </div>
          <div className="mt-[21px] border-b-[1px] border-Gray2 p-[10px]">
            <h1 className="font-sans text-[21px]/[120%] text-Gray2">
              Support and feedback
            </h1>
          </div>
          <div className="flex flex-col mb-[100px]">
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Send feedback
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              Contact support
            </Link>
            <Link className="p-[10px] font-sans text-[16px]/[120%]" href={"#"}>
              FAQs
            </Link>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
