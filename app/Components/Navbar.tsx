import React from "react";
import "../../app/globals.css";
import Link from "next/link";

export default function Navbar1() {
  return (
    <div className="mb-0 flex flex-row bg-Gold3 items-center justify-between w-[631px] py-[12px] px-[30px] rounded-[999px] ">
      <Link
        className="font-sans text-[12px] font-medium text-PriGold"
        href={"#"}
      >
        Home
      </Link>
      <Link
        className="font-sans text-[12px] font-medium text-PriGold"
        href={"#"}
      >
        Dashboard
      </Link>
      <Link
        className="font-sans text-[12px] font-medium text-PriGold"
        href={"#"}
      >
        Notifications
      </Link>
      <Link
        className="font-sans text-[12px] font-medium text-PriGold"
        href={"#"}
      >
        Messages
      </Link>
      <Link
        className="font-sans text-[12px] font-medium text-PriGold"
        href={"#"}
      >
        Settings
      </Link>
      <div className=" bg-White h-[36px] w-[36px] rounded-[18px]"></div>
    </div>
  );
}
