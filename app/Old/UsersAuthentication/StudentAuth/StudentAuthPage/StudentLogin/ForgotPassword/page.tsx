"use client";
import Logo from "@/app/Components/Logo";
import ForgotPasswordForm from "./form";
import Button1 from "@/app/user/Components/Button1";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="p-[2%] flex flex-col">
      <div className="w-[100%] mb-8 flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center">
        {/* <div className="flex flex-col justify-center px-[5%] pt-[3%]"> */}
        <h2 className="text-center font-sans text-[36px]/[120%] mb-2 font-medium text-Blue4">
          Passwords are really hard to remember, right?
          <br />
          Let&apos;s help you set up a new one ASAP!
        </h2>
        {/* <h6 className="mt-[14px] font-sans text-center text-[16px]/[120%] text-Gray1"> */}
        <h6 className="font-sans text-center text-[16px]/[120%] text-Gray1">
          Enter the email address linked to your account and we&apos;d send a
          <br />
          5-digit OTP that you&apos;d enter in the next screen
        </h6>
        <div className="flex w-[45%] mt-16 flex-col justify-center self-center">
          <ForgotPasswordForm />
          <div className=" flex justify-center item-center w-[100%]">
            <Button1 text="Send OTP" className=" mt-24 text-[16px] w-[85%] " />
          </div>
          {/* <h1 className="mb-[40px] mt-[36px] font-sans text-center text-[16px]/[120%] text-Gray1"> */}
          <h1 className=" mt-6 font-sans text-center text-[16px]/[120%] text-Gray1">
            Remembered your password?{" "}
            <button>
              <Link className="text-PriGold" href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}>
                Login now
              </Link>
            </button>
          </h1>
          <div className="flex w-[100%] justify-center ">
            <Link
              href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}
              className="flex text-center justify-center border-Blue0 border-b-2 p-1"
            >
              <h1 className="text-[16px]/[120%] mt-6 font-sans font-normal text-Gold1">
                Register instead
              </h1>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
