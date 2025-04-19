"use client";
import React from "react";
import Header1 from "../Components/Header1";
import SearchBar from "../Components/SearchBar";
import Footer1 from "../Components/Footer1";

export default function CompanyNotifications() {
  return (
    <div>
      <div className="px-[3%] py-[1%]">
        <Header1 />
        <SearchBar />
        <div className="mt-[51px]">
          <div className="mb-[12px] flex flex-row items-center justify-between rounded-[15px] px-[24px] py-[16px] shadow-custom2">
            <div className="flex flex-row items-center">
              <div className="mr-[18px] h-[80px] w-[80px] rounded-[12px] bg-red-700"></div>
              <div className="flex flex-col">
                <h1 className="mb-[5px] font-sans text-[16px]/[120%]">
                  Job posted successfully
                </h1>
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-Gold1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h1 className="ml-[5px] font-sans text-[12px] font-medium text-Gold1">
                    Data analyst intern
                  </h1>
                </div>
              </div>
            </div>
            <button className="w-[227px] rounded-[999px] border-[2px] border-PriGold px-[50px] py-[8px] font-sans text-[12px] text-PriGold">
              View job post
            </button>
          </div>
          <div className="mb-[12px] flex flex-row items-center justify-between rounded-[15px] px-[24px] py-[16px] shadow-custom2">
            <div className="flex flex-row items-center">
              <div className="mr-[18px] h-[80px] w-[80px] rounded-[12px] bg-red-700"></div>
              <div className="flex flex-col">
                <h1 className="mb-[5px] font-sans text-[16px]/[120%]">
                  Application status alert
                </h1>
                <div className="flex flex-row items-center space-x-[15px]">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gold1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                    <h1 className="ml-[5px] font-sans text-[12px] font-medium text-Gold1">
                      Data analyst intern
                    </h1>
                  </div>
                  <h1 className="font-sans text-[12px] font-medium text-Gold1">
                    Status: You&apos;ve got 1 new application
                  </h1>
                </div>
              </div>
            </div>
            <button className="w-[227px] rounded-[999px] border-[2px] border-PriGold px-[50px] py-[8px] font-sans text-[12px] text-PriGold">
              View application
            </button>
          </div>
          <div className="mb-[12px] flex flex-row items-center justify-between rounded-[15px] px-[24px] py-[16px] shadow-custom2">
            <div className="flex flex-row items-center">
              <div className="mr-[18px] h-[80px] w-[80px] rounded-[12px] bg-red-700"></div>
              <div className="flex flex-col">
                <h1 className="mb-[5px] font-sans text-[16px]/[120%]">
                  Offer status alert
                </h1>
                <div className="flex flex-row items-center space-x-[15px]">
                  <div className="flex flex-row items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 text-Gold1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                    <h1 className="ml-[5px] font-sans text-[12px] font-medium text-Gold1">
                      John Doe
                    </h1>
                  </div>
                  <div className="flex flex-row items-center">
                    <h1 className="font-sans text-[12px] font-medium text-Gold1">
                      Status:
                    </h1>
                    <div className="ml-[5px] flex flex-row items-center rounded-[6px] bg-Red2 px-[15px] py-[6px]">
                      <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Red1"></div>
                      <p className="font-sans text-[12px] text-Red1">
                        Rejected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-[227px] rounded-[999px] border-[2px] border-PriGold px-[50px] py-[8px] font-sans text-[12px] text-PriGold">
              View applicant
            </button>
          </div>
        </div>
        <div className="mb-[12px] flex flex-row items-center justify-between rounded-[15px] px-[24px] py-[16px] shadow-custom2">
          <div className="flex flex-row items-center">
            <div className="mr-[18px] h-[80px] w-[80px] rounded-[12px] bg-red-700"></div>
            <div className="flex flex-col">
              <h1 className="mb-[5px] font-sans text-[16px]/[120%]">
                Data analyst intern
              </h1>
              <div className="flex flex-row items-center space-x-[15px]">
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-Gold1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>

                  <h1 className="font-sans text-[12px] font-medium text-Gold1">
                    9th June, 2025
                  </h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-[10px] size-6 text-Gold1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h1 className="font-sans text-[12px] text-Gold1">9:00 AM</h1>
                </div>
              </div>
            </div>
          </div>
          <button className="w-[227px] rounded-[999px] border-[2px] border-Red1 py-[8px] font-sans text-[12px] font-medium text-Red1">
            Cancel Appointment
          </button>
        </div>
        <div className="mb-[12px] flex flex-row items-center justify-between rounded-[15px] px-[24px] py-[16px] shadow-custom2">
          <div className="flex flex-row items-center">
            <div className="mr-[18px] h-[80px] w-[80px] rounded-[12px] bg-red-700"></div>
            <div className="flex flex-col">
              <h1 className="mb-[5px] font-sans text-[16px]/[120%]">
                Offer status alert
              </h1>
              <div className="flex flex-row items-center space-x-[15px]">
                <div className="flex flex-row items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-Gold1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                  <h1 className="ml-[5px] font-sans text-[12px] font-medium text-Gold1">
                    John Doe
                  </h1>
                </div>
                <div className="flex flex-row items-center">
                  <h1 className="font-sans text-[12px] font-medium text-Gold1">
                    Status:
                  </h1>
                  <div className="ml-[5px] flex flex-row items-center rounded-[6px] bg-Green2 px-[15px] py-[6px]">
                    <div className="mr-[5px] h-[8px] w-[8px] rounded-[4px] bg-Green1"></div>
                    <p className="font-sans text-[12px] text-Green1">
                      Accepted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="w-[227px] rounded-[999px] border-[2px] border-PriGold px-[50px] py-[8px] font-sans text-[12px] text-PriGold">
            View applicant
          </button>
        </div>
        <div className="mb-[12px] flex flex-row items-center rounded-[15px] px-[24px] py-[16px] shadow-custom2">
          <div className="flex flex-row items-center">
            <div className="mr-[18px] h-[80px] w-[80px] max-w-[90px] rounded-[40px] bg-Gray2">
              {/* <div className=" h-[12px] w-[12px] rounded-[6px] bg-Gold1"></div> */}
            </div>
            <div className="flex flex-col">
              <h1 className="mb-[5px] font-sans text-[16px]/[120%]">
                You&apos;ve got a message from John Doe
              </h1>
              <div className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="size-4 text-Gold1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <h1 className="ml-[5px] font-sans text-[12px] font-normal text-Gold1">
                  Hello there John, this is an unofficial congratulat...
                </h1>
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
