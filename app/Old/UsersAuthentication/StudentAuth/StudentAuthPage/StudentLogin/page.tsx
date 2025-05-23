// app/UsersAuthentication/StudentAuth/StudentAuthPage/StudentLogin/page.tsx
"use client";

import LoginForm from "../StudentLogin/form";
import Image from "next/image";

export default function StudentLoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="/Images/Logo3.png"
          alt="CDP Logo"
          width={150}  // Added required width property
          height={48}  // Added required height property (h-12 is 48px)
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Student Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm userType="student" />
      </div>
    </div>
  );
}