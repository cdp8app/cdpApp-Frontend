"use client";
import React from "react";
import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/UsersAuthentication/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Link from "next/link";

export default function CompanyJobApplicantInfo() {
  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]">
          <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
              <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                John Doe
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                MEDICINE/SURGERY
              </h1>
              <Button7
                text="View profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
          </div>
          <div className="w-[75%]">
            <Link href={"#"} className="mb-[21px] flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-8 text-Gray1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              <p className="font-sans text-[36px]/[120%] text-Gold1">
                Application status
              </p>
            </Link>
            <div className="flex w-[114px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
                Pending
              </p>
            </div>
            <div className="flex w-[117px] flex-row items-center rounded-[8px] bg-BlueB1 bg-opacity-15 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-BlueB1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-BlueB1">
                Interview
              </p>
            </div>
            <div className="flex w-[115px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
                Rejected
              </p>
            </div>
            <div className="flex w-[123px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
                Accepted
              </p>
            </div>
            <button className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Back to applications
            </button>
            <button className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              See schedule
            </button>
            <button className="my-[21px] rounded-[999px] border-[2px] border-PriGold px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-PriGold">
              Proceed to interview
            </button>
            <div className=" flex w-[80%] flex-col">
              <div>
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  COVER LETTER:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  Calabar, Nigeria
                </p>
              </div>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Reject Internship
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Proceed to interview
              </button>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Withdraw job offer
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Extend job offer
              </button>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End internship
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Rate student
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
