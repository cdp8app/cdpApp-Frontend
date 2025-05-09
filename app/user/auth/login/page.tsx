// app/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "../login/form";
import Image from "next/image";


export default function StudentLoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"student" | "company" | null>(null);
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "student" || storedUserType === "company") {
      setUserType(storedUserType);
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="/Images/Logo3.png"
          alt="CDP Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {userType && (
          <LoginForm userType={userType === "student" ? "student" : "company"} />
        )}
      </div>
    </div>
  );
}