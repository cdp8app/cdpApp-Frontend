// app/UsersAuthentication/CompanyAuth/CompanyLogin/page.tsx
"use client";

import LoginForm from "../../StudentAuth/StudentAuthPage/StudentLogin/form";
import Image from "next/image";

export default function CompanyLoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          src="/Images/Logo3.png"
          alt="CDP Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Company Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm userType="company" />
      </div>
    </div>
  );
}