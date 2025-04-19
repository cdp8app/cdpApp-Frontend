"use client";
import React from "react";
import Header1 from "../Components/Header1";
import Link from "next/link";

export default function Messaging() {
  return (
    <div>
      <div className="px-[3%] pt-[1%]">
        <Header1 />
        <div className="px-[15%]">
          <div className="mb-[57px] flex flex-row items-center border-b-[1px] border-Gold3 p-[10px]">
            <Link href={"#"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="mr-[18px] size-9 text-Gold1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
            <h1 className="font-sans text-[36px]/[120%] text-Gold1">
              Messages
            </h1>
          </div>
          <div className="flex flex-row rounded-t-[18px] border-[1px] border-PriGold">
            <div className="h-full w-[60%] overflow-y-auto">
              <div className="flex flex-row items-center rounded-tl-[18px] border-b-[1px] border-PriGold bg-Gold3 px-[23px] py-[16px]">
                <div className="mr-[10px] h-[70px] w-[70px] rounded-[35px] bg-Gray2"></div>
                <h1 className="font-sans text-[21px]/[120%]">
                  Victoria Benson
                </h1>
              </div>
              <div className="pl-[24px] pr-[5px] pt-[24px]">
                <div className="flex flex-row items-end mb-[12px]">
                  <div className="mr-[12px] h-[36px] w-[36px] rounded-[18px] bg-Gray2"></div>
                  <div className="h-auto w-[60%] rounded-t-[16px] rounded-br-[16px] bg-Gold3 px-[16px] py-[12px]">
                    <p className="mb-[12px] font-sans text-[16px]/[120%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor
                    </p>
                    <p className="justify-self-end font-sans text-[12px]/[120%] text-PriGold">
                      09:45
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-end">
                  <div className="mr-[12px] h-[36px] w-[36px] rounded-[18px] bg-Gray2"></div>
                  <div className="h-auto w-[60%] rounded-t-[16px] rounded-br-[16px] bg-Gold3 px-[16px] py-[12px]">
                    <p className="mb-[12px] font-sans text-[16px]/[120%]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                    <p className="justify-self-end font-sans text-[12px]/[120%] text-PriGold">
                      09:45
                    </p>
                  </div>
                </div>
                <div className="mt-[20px] h-auto w-[60%] justify-self-end rounded-t-[16px] rounded-bl-[16px] bg-Gold2 px-[16px] py-[12px]">
                  <p className="mb-[12px] font-sans text-[16px]/[120%]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                  <p className="justify-self-end font-sans text-[12px]/[120%] text-PriGold">
                    09:45
                  </p>
                </div>
              </div>
              <div className="m-[10px] flex w-[90%] flex-row items-center justify-between justify-self-center rounded-[45px] border-[1px] border-Gold2 bg-White px-[30px] py-[20px]">
                <input
                  type="text"
                  className="w-[85%] font-sans text-Blue0 placeholder-Gray1 caret-Gold0 outline-none"
                  placeholder="Type a message"
                />
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-[40%] border-l-[1px] border-PriGold">
              <div className="mx-[14px] flex flex-row items-center border-b-[0.6px] border-Gray2 py-[6px]">
                <div className="mr-[10px] h-[70px] w-[70px] rounded-[12px] bg-Gray2"></div>
                <div className="flex w-[75%] flex-col space-y-3">
                  <p className="font-sans text-[16px]/[120%] text-Blue0">
                    Big star Tech...
                  </p>
                  <div className="flex w-[100%] flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="mr-[5px] size-6 text-Gold1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>
                      <p className="font-sans text-[12px]/[120%] text-Gold1">
                        Hello there John, this...
                      </p>
                    </div>
                    <p className="font-sans text-[12px]/[120%] font-medium text-Gold1">
                      09:45
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-[14px] flex flex-row items-center border-b-[0.6px] border-Gray2 py-[6px]">
                <div className="mr-[10px] h-[70px] w-[70px] rounded-[12px] bg-Gray2"></div>
                <div className="flex w-[75%] flex-col space-y-3">
                  <p className="font-sans text-[16px]/[120%] text-Blue0">
                    Big star Tech...
                  </p>
                  <div className="flex w-[100%] flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="mr-[5px] size-6 text-Gold1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>
                      <p className="font-sans text-[12px]/[120%] text-Gold1">
                        Hello there John, this...
                      </p>
                    </div>
                    <p className="font-sans text-[12px]/[120%] font-medium text-Gold1">
                      09:45
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-[14px] flex flex-row items-center border-b-[0.6px] border-Gray2 py-[6px]">
                <div className="mr-[10px] h-[70px] w-[70px] rounded-[35px] bg-Gray2"></div>
                <div className="flex w-[75%] flex-col space-y-3">
                  <p className="font-sans text-[16px]/[120%] text-Blue0">
                    Victoria Benson
                  </p>
                  <div className="flex w-[100%] flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="mr-[5px] size-6 text-Gold1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>
                      <p className="font-sans text-[12px]/[120%] text-Gold1">
                        Hello there John, this...
                      </p>
                    </div>
                    <p className="font-sans text-[12px]/[120%] font-medium text-Gold1">
                      09:45
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
