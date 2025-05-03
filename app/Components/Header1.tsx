"use client";
import React from "react";
import "../../app/globals.css";
import Navbar1 from "./Navbar";
import LogoComponent2 from "./Logo3";
import { useAuth } from "@/contexts/AuthContext"; 

export default function Header1() {
  const { userType } = useAuth();
  return (
    <div className="mb-[46px] flex w-[75%] flex-row items-center justify-between">
      <LogoComponent2 />
      <Navbar1 userType={userType ?? "student"} />
    </div>
  );
}
