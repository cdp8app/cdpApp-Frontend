import React from "react";
import "../../app/globals.css";
import Link from "next/link";
import NotificationBell from "./NotificationBell";

interface Navbar1Props {
  userType: "student" | "company";
}

export default function Navbar1({ userType }: Navbar1Props) {
  const studentLinks = [
    { name: "Home", href: "/student/homepage" },
    { name: "Dashboard", href: "/student/dashboard" },
    { name: "Messages", href: "/messaging" },
    { name: "Settings", href: "/settings" },
  ];

  const companyLinks = [
    { name: "Home", href: "/company/homepage" },
    { name: "Dashboard", href: "/company/dashboard" },
    { name: "Applicants", href: "/company/applicant" },
    { name: "Post Job", href: "/company/job/create" },
    { name: "Settings", href: "/settings" },
  ];

  const links = userType === "student" ? studentLinks : companyLinks;

  return (
    <div className="mb-0 flex flex-row bg-Gold3 items-center justify-between w-[631px] py-[12px] px-[30px] rounded-[999px]">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="font-sans text-[12px] font-medium text-PriGold"
        >
          {link.name}
        </Link>
      ))}
      {/* Notification Bell */}
      <NotificationBell />
      <div className="bg-White h-[36px] w-[36px] rounded-[18px]"></div>
    </div>
  );
}