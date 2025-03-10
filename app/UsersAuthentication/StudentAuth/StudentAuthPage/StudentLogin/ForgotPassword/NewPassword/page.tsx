("");
("use client");
import Logo from "@/app/Components/Logo";
import Button1 from "@/app/UsersAuthentication/Components/Button1";
import Link from "next/link";
import NewPasswordForm from "./form";

export default function NewPasswordPage() {
  return (
    <div className="p-[1%]">
      <Logo />
      <div className="flex flex-col justify-center px-[5%] pt-[3%]">
        <h2 className="text-center font-sans text-[36px]/[120%] font-medium text-Blue4">
          Set a new password
        </h2>
        <h6 className="mt-[14px] text-center text-[21px]/[120%] text-Gray1">
          Set up a new password with at least 8 characters
        </h6>
        <div className="flex w-[45%] flex-col justify-center self-center">
          <NewPasswordForm />
          <Button1 text="Set new password" className="mb-[14px] mt-[66px]" />
          <div className="flex flex-row items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-[4px] size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            <Link
              href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}
              className="text-center"
            >
              <h1 className="text-[21px]/[120%] font-normal text-Blue1">
                Back to Login
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
