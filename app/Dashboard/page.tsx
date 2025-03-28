"use client";
import React from "react";
import Header1 from "../Components/Header1";
import Button7 from "../UsersAuthentication/Components/Button7";
import Link from "next/link";
import Footer1 from "../Components/Footer1";

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="p-[1%]">
        <Header1 />
        <div className="shadow-custom flex w-[100%] flex-row rounded-[30px] mb-[80px] bg-GoldenWhite p-[2%]">
          <div className="flex py-[5%] space-y-[200px] w-[20%] items-center flex-col">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-[16px] h-[134px] w-[134px] rounded-[67px] bg-Red1"></div>
              <h1 className="mb-[6px] font-sans text-[27px]/[120%] font-bold">
                John Doe
              </h1>
              <h1 className="mb-[21px] font-sans text-[12px]/[120%] font-normal text-Gray2">
                Med/surgery
              </h1>
              <Button7
                text="View Profile"
                className="text-[12px]/[120%] font-normal"
              />
            </div>
            <div>
              <Link
                className="flex flex-row items-center py-[12px] font-sans text-[12px]/[120%] font-normal text-Red1"
                href={"#"}
              >
                Log out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="ml-2 size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="w-[80%]">
            <div className="shadow-custom2 mb-[25px] w-[100%] rounded-[20px] bg-White p-[2%]">
              <div className="mb-[22px] flex w-[100%] flex-row items-center justify-between">
                <p className="font-sans text-[21px]/[120%] text-Gray2">
                  INTERNSHIPS
                </p>
                <Link
                  className="flex flex-row items-center py-[12px] font-sans text-[21px]/[120%] font-normal text-Gray2"
                  href={"#"}
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-[32%] rounded-[11.62px] bg-Green2 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Green1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Green1">
                      COMPLETED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="bg-Yellow2 w-[32%] rounded-[11.62px] px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-Yellow1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-Yellow1 font-sans text-[16px]/[120%]">
                      ONGOING
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="w-[32%] rounded-[11.62px] bg-Red2 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Red1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Red1">
                      NOT STARTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow-custom2 mb-[25px] w-[100%] rounded-[20px] bg-White p-[2%]">
              <div className="mb-[22px] flex w-[100%] flex-row items-center justify-between">
                <p className="font-sans text-[21px]/[120%] text-Gray2">
                  APPLICATIONS
                </p>
                <Link
                  className="flex flex-row items-center py-[12px] font-sans text-[21px]/[120%] font-normal text-Gray2"
                  href={"#"}
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-[24%] rounded-[11.62px] bg-Green2 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Green1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Green1">
                      ACCEPTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="bg-BlueB1 w-[24%] rounded-[11.62px] bg-opacity-15 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-BlueB1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-BlueB1 font-sans text-[16px]/[120%]">
                      INTERVIEW
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="bg-Yellow2 w-[24%] rounded-[11.62px] px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-Yellow1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-Yellow1 font-sans text-[16px]/[120%]">
                      PENDING
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="w-[24%] rounded-[11.62px] bg-Red2 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Red1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Red1">
                      REJECTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
              </div>
            </div>
            <div className="shadow-custom2 mb-[25px] w-[100%] rounded-[20px] bg-White p-[2%]">
              <div className="mb-[22px] flex w-[100%] flex-row items-center justify-between">
                <p className="font-sans text-[21px]/[120%] text-Gray2">
                  OFFERS
                </p>
                <Link
                  className="flex flex-row items-center py-[12px] font-sans text-[21px]/[120%] font-normal text-Gray2"
                  href={"#"}
                >
                  See all
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="ml-2 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex flex-row justify-between">
                <div className="w-[24%] rounded-[11.62px] bg-Gray2 bg-opacity-30 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Gold1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Gold1">
                      ALL
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="w-[24%] rounded-[11.62px] bg-Green2 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Green1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Green1">
                      ACCEPTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="bg-Yellow2 w-[24%] rounded-[11.62px] px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="bg-Yellow1 mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px]"></div>
                    <h1 className="text-Yellow1 font-sans text-[16px]/[120%]">
                      PENDING
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
                <div className="w-[24%] rounded-[11.62px] bg-Red2 px-[22.29px] py-[21.39]">
                  <div className="mb-[6px] flex flex-row items-center">
                    <div className="mr-[5px] h-[8.37px] w-[8.37px] rounded-[4.18px] bg-Red1"></div>
                    <h1 className="font-sans text-[16px]/[120%] text-Red1">
                      REJECTED
                    </h1>
                  </div>
                  <p className="font-sans text-[47px]/[49px] font-bold text-Black2">
                    11
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1/>
    </div>
  );
}
