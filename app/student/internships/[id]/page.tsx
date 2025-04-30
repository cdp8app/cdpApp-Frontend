"use client";
import React from "react";
import Header1 from "@/app/Components/Header1";
import Button7 from "@/app/user/Components/Button7";
import Footer1 from "@/app/Components/Footer1";
import Logout from "@/app/user/auth/logout/page";

export default function StudentInternshipInfo() {
  return (
    <div className="flex flex-col">
      <div className="p-[2%]">
        <Header1 />
        <div className="mb-[80px] flex w-[100%] flex-row justify-between rounded-[30px]">
          <div className="flex w-[20%] flex-col items-center space-y-[200px] py-[1%]">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
              <h1 className="mb-[6px] text-center font-sans text-[27px]/[120%] font-bold">
                Big Star Technologies
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                INFORMATION TECHNOLOGY
              </h1>
              <Button7
                text="View Profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
            <Logout/>
          </div>
          <div className="w-[75%]">
            <h1 className="mb-[21px] font-sans text-[36px]/[120%] text-Gold1">
              Internship information
            </h1>
            <div className="flex w-[114px] flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Yellow1">
                Ongoing
              </p>
            </div>
            <div className="flex w-[135px] flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Red1">
                Not started
              </p>
            </div>
            <div className="flex w-[136px] flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
              <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
              <p className="font-sans text-[16px]/[120%] font-normal text-Green1">
                Completed
              </p>
            </div>
            <div className="mt-[21px] flex w-[80%] flex-col">
              <div>
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  ROLE:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  Data Analyst
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  LOCATION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  On-site: Port Harcourt
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DESCRIPTION:
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
                  REQUIREMENTS:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation
                </p>
              </div>
              <div className="mt-[21px]">
                <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                  DURATION:
                </h1>
                <p className="font-sans text-[16px]/[120%] text-Black2">
                  SIX MONTHS
                </p>
              </div>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                End internship
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Rate company
              </button>
            </div>
            <div className="mt-[21px] flex flex-row">
              <button className="mr-[18px] rounded-[999px] border-[2px] border-Red1 px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-Red1">
                Write report
              </button>
              <button className="rounded-[999px] bg-gradient-to-r px-[80px] py-[18px] font-sans text-[16px]/[120%] font-normal text-GoldenWhite">
                Rate company
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
