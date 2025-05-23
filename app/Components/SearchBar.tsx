"use client";
import React from "react";

export default function SearchBar() {
  return (
    <div className=" flex w-[70%] justify-center justify-self-center">
      <div className="flex w-[100%] justify-center border-b-[1px] pb-[15px] border-Gold3">
        <input
          placeholder="Search Add Icon Later"
          className="flex w-[90%] rounded-[60px] border-[1px] border-Gold3 py-[25px] text-center font-sans placeholder-Gray2 focus:border-[2px] focus:border-PriGold focus:outline-none"
        />
        <button className="flex justify-center items-center ml-[12px] w-[75px] h-[75px] rounded-[60px] border-Gold3 border-[1px] ">
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
        {/* <svg
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg> */}
      </div>
    </div>
  );
}
