import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { CldImage } from "next-cloudinary";
import NotificationBell from "./NotificationBell";

interface Navbar1Props {
  userType: "student" | "company";
}

export default function Navbar1({ userType }: Navbar1Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Handle window resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth > 768) {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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
  const { user } = useAuth();

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative z-10">
      {/* Desktop & Tablet Navigation */}
      <div className="hidden md:flex bg-Gold3 items-center justify-between max-w-4xl mx-auto py-3 px-6 rounded-full">
        <div className="flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-sans text-sm font-medium text-PriGold hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[36px] w-[36px] rounded-[18px] overflow-hidden bg-White">
            {user?.profile_picture ? (
              <CldImage
                width="36"
                height="36"
                src={user?.profile_picture}
                alt="Description of my image"
              />
            ) : (
              <div className="bg-White h-[36px] w-[36px] rounded-[18px]"></div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <div className="bg-White h-9 w-9 rounded-full cursor-pointer"></div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-Gold3 px-4 py-3 rounded-full flex items-center justify-between">
        <button 
          onClick={toggleMenu}
          className="text-PriGold focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Logo or Title could go here */}
        <div className="text-PriGold font-bold">
          {userType === "student" ? "Student" : "Company"} Portal
        </div>
        
        <div className="flex items-center space-x-3">
          <NotificationBell />
          <div className="bg-White h-8 w-8 rounded-full cursor-pointer"></div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-Gold3 rounded-lg shadow-lg py-2 px-4 transition-all duration-300 ease-in-out">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block py-3 text-PriGold hover:text-white font-medium border-b border-PriGold/20 last:border-0"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-[36px] w-[36px] rounded-[18px] overflow-hidden bg-White">
            {user?.profile_picture ? (
              <CldImage
                width="36"
                height="36"
                src={user?.profile_picture}
                alt="Description of my image"
              />
            ) : (
              <div className="bg-White h-[36px] w-[36px] rounded-[18px]"></div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}