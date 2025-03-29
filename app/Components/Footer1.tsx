import React from "react";
import "../../app/globals.css";
import Image from "next/image";
import Logo3 from "../../public/Images/Logo3.png";
import Link from "next/link";

export default function Footer1() {
  return (
    <div className="mb-0 flex flex-col bg-Black2 px-[95px] pt-[56px] pb-[33px] ">
      <div className="itemx-center mb-[43px] flex flex-row">
        <p className="mr-[15px] font-sans text-[16px]/[120%] font-medium text-White">
          Support Email:
        </p>
        <p className="font-sans text-[16px]/[120%] font-normal text-White">
          contact@careerxhub.com
        </p>
      </div>
      <div className="flex w-[100%] items-center justify-between">
        <Image
          src={Logo3}
          alt="Logo3"
          className="h-[40px] w-[277px] object-contain"
        />
        <div className="space-x-5">
          <Link
            className="font-sans text-[16px]/[120%] font-normal text-White"
            href={"#"}
          >
            Home
          </Link>
          <Link
            className="font-sans text-[16px]/[120%] font-normal text-White"
            href={"#"}
          >
            Dashboard
          </Link>
          <Link
            className="font-sans text-[16px]/[120%] font-normal text-White"
            href={"#"}
          >
            Jobs
          </Link>
          <Link
            className="font-sans text-[16px]/[120%] font-normal text-White"
            href={"#"}
          >
            Notifications
          </Link>
          <Link
            className="font-sans text-[16px]/[120%] font-normal text-White"
            href={"#"}
          >
            Messages
          </Link>
          <Link
            className="font-sans text-[16px]/[120%] font-normal text-White"
            href={"#"}
          >
            Settings
          </Link>
        </div>
        <div>
          <h1 className="mb-[13px] font-sans font-normal text-White">
            Join the conversation:
          </h1>
          <div className="space-x-[11px]">
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            <button className="h-[20px] w-[20px] rounded-[10px] bg-White"></button>
            {/* <Link
              className="bg-White w-[20px] h-[20px] "
              href={"#"}
            >
              aa
            </Link> */}
          </div>
        </div>
      </div>
      <div className=" w-[100%] bg-White h-[1px] mt-[36.5px] "></div>
      <div className="flex justify-center mt-[26.5px]">
        <h1 className="font-sans text-[16px]/[120%] text-White">Copyright © careerxhub | All Rights Reserved - Powered by CareerXHub</h1>
      </div>
    </div>
  );
}
