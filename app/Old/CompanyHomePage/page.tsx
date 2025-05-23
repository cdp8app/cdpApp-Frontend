"use client";
import React from "react";
import Header1 from "@/app/Components/Header1";
import SearchBar from "@/app/Components/SearchBar";
import Footer1 from "@/app/Components/Footer1";

export default function CompanyHomePage() {
  return (
    <div>
      <div className="px-[3%] py-[1%]">
        <Header1 />
        <SearchBar />
        <div className="mt-[21px]">
          <div className="flex flex-row shadow-custom2 max-w-[432px] p-[18px] items-center rounded-[15px] ">
            <div className="w-[100px] mr-[12px] h-[100px] rounded-full bg-Gray1 bg-opacity-30 "></div>
            <div>
              <h1 className="font-sans text-[16px]/[120%] mb-[1px] text-Black2">Samuel Edidiong</h1>
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
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
                <p className="font-sans text-[16px]/[80%] text-Gray1">COMPUTER ENGINEERING</p>
              </div>
              <button className="font-sans text-PriGold text-[12px]/[120%] border-[2px] border-PriGold py-[10px] px-[24px] rounded-[999px] mt-[1px] ">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[91px]"></div>
      <Footer1 />
    </div>
  );
}
