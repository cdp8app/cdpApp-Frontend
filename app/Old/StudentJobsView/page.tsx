"use client";
import React from "react";
import Header1 from "../../Components/Header1";
import SearchBar from "../../Components/SearchBar";
import Footer1 from "../../Components/Footer1";

export default function StudentJobsView() {
  return (
    <div>
      <div className="px-[3%] py-[1%]">
        <Header1 />
        <SearchBar />
        <div className="mt-[21px]">
          <div className="flex max-w-[627px] flex-row items-center rounded-[15px] p-[18px] shadow-custom2">
            <div className="mr-[12px] h-[145px] w-[145px] min-w-[145px] rounded-[12px] bg-Gray1 bg-opacity-30"></div>
            <div>
              <h1 className="mb-[4px] font-sans text-[16px]/[120%] text-Black2">
                Data analyst intern
              </h1>
              <div className="flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-Gray1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                  />
                </svg>
                <p className="font-sans text-[16px]/[80%] text-Gray1">
                  BIG STAR TECHNOLOGIES
                </p>
              </div>
              <p className="font-sans text-Gray2 mt-[5px] text-[12px]/[120%] max-w-[80%]">
                Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do
                eiusm odtempor incididunt utlabor et doloLorem ipsum dolor sit
                amet, consectetur
              </p>
              <button className="mt-[5px] rounded-[999px] border-[2px] border-PriGold px-[24px] py-[10px] font-sans text-[12px]/[120%] text-PriGold">
                View details
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[91px] flex justify-center">
        <button className="font-sans text-[16px]/[120%] border-b-[2px] py-[10px] px-[5px] border-PriGold text-Gray1 mt-[70px] ">
            Load more results
        </button>
      </div>
      <Footer1 />
    </div>
  );
}
