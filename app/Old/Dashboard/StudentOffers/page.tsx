"use client";
import Footer1 from "@/app/Components/Footer1";
import Header1 from "@/app/Components/Header1";
import Link from "next/link";
import React, { useState } from "react";

export default function StudentOffers() {
  const [section, setSection] = useState(1);

  const handleSectionChange = (sectionNumber: number) => {
    setSection(sectionNumber);
  };
  return (
    <div>
      <div className="mb-[100px] p-[1.5%]">
        <Header1 />
        <div className="px-[4%]">
          <div className="mb-[18px] border-b-[1px] border-Gold2">
            <Link
              className="flex flex-row items-center py-[12px] font-sans text-[27px]/[120%] font-normal text-Gold1"
              href={"#"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
              Offers
            </Link>
          </div>
          <div className="space-x-[16px]">
            <button
              onClick={() => handleSectionChange(1)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 1 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              All
            </button>
            <button
              onClick={() => handleSectionChange(2)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 2 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Accepted
            </button>
            <button
              onClick={() => handleSectionChange(3)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 3 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Pending
            </button>
            <button
              onClick={() => handleSectionChange(4)}
              className={`w-[186px] rounded-[30px] px-[20px] py-[12px] font-sans text-[16px]/[120%] shadow-custom2 ${section === 4 ? "bg-PriGold" : "bg-GoldenWhite text-Gray2"}`}
            >
              Rejection
            </button>
          </div>
          {section === 1 && (
            <div className="mt-[20px]">
              <div className="flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
                <div className="flex flex-row items-center">
                  <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                  <div className="ml-[12px] flex flex-col">
                    <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                      Data analyst intern
                    </h1>
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-Gray2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>

                      <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                        BIG STAR TECHNOLOGIES
                      </h1>
                    </div>
                    <button className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                      Start Internship
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                  <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                  <p className="font-sans text-[12px]/[120%] font-normal text-Red1">
                    Rejected
                  </p>
                </div>
              </div>
              <div className="mt-[20px] flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
                <div className="flex flex-row items-center">
                  <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                  <div className="ml-[12px] flex flex-col">
                    <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                      Data analyst intern
                    </h1>
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-Gray2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>

                      <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                        BIG STAR TECHNOLOGIES
                      </h1>
                    </div>
                    <button className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                  <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                  <p className="font-sans text-[12px]/[120%] font-normal text-Green1">
                    Accepted
                  </p>
                </div>
              </div>
              <div className="mt-[20px] flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
                <div className="flex flex-row items-center">
                  <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                  <div className="ml-[12px] flex flex-col">
                    <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                      Data analyst intern
                    </h1>
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-Gray2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>

                      <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                        BIG STAR TECHNOLOGIES
                      </h1>
                    </div>
                    <button className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
                  <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
                  <p className="font-sans text-[12px]/[120%] font-normal text-Yellow1">
                    Pending
                  </p>
                </div>
              </div>
            </div>
          )}
          {section === 2 && (
            <div className="mt-[20px] flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
              <div className="flex flex-row items-center">
                <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                <div className="ml-[12px] flex flex-col">
                  <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                    Data analyst intern
                  </h1>
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gray2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                      />
                    </svg>

                    <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                      BIG STAR TECHNOLOGIES
                    </h1>
                  </div>
                  <button className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                    View Details
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center rounded-[8px] bg-Green2 px-[16px] py-[8px]">
                <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                <p className="font-sans text-[12px]/[120%] font-normal text-Green1">
                  Accepted
                </p>
              </div>
            </div>
          )}
          {section === 3 && (
            <div className="mt-[20px] flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
              <div className="flex flex-row items-center">
                <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                <div className="ml-[12px] flex flex-col">
                  <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                    Data analyst intern
                  </h1>
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gray2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                      />
                    </svg>

                    <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                      BIG STAR TECHNOLOGIES
                    </h1>
                  </div>
                  <button className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                    View Details
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center rounded-[8px] bg-Yellow2 px-[16px] py-[8px]">
                <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Yellow1"></div>
                <p className="font-sans text-[12px]/[120%] font-normal text-Yellow1">
                  Pending
                </p>
              </div>
            </div>
          )}
          {section === 4 && (
            <div className="mt-[20px]">
              <div className="flex w-[100%] flex-row items-center justify-between rounded-[18px] bg-GoldenWhite py-[16px] pl-[16px] pr-[55px] shadow-custom2">
                <div className="flex flex-row items-center">
                  <div className="h-[127px] w-[127px] rounded-[12px] bg-Gray3"></div>
                  <div className="ml-[12px] flex flex-col">
                    <h1 className="mb-[6px] font-sans text-[16px]/[120%]">
                      Data analyst intern
                    </h1>
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-Gray2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                        />
                      </svg>

                      <h1 className="font-sans text-[16px]/[120%] text-Gray2">
                        BIG STAR TECHNOLOGIES
                      </h1>
                    </div>
                    <button className="mt-[18px] flex w-[136px] flex-row items-center justify-center rounded-[999px] border-[2px] border-PriGold px-[20px] py-[10px] font-sans text-[12px]/[100%] font-normal text-PriGold">
                      Start Internship
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center rounded-[8px] bg-Red2 px-[16px] py-[8px]">
                  <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                  <p className="font-sans text-[12px]/[120%] font-normal text-Red1">
                    Rejected
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}
