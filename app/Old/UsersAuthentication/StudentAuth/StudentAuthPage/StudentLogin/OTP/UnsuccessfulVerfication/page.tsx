"use client";
import Logo from "@/app/Components/Logo";
import Button1 from "@/app/user/Components/Button1";
import Link from "next/link";
import { useState } from "react";

export default function UnsuccessfulVerficationPage() {
  const [otp, setOtp] = useState<string[]>(["6", "7", "4", "6", "5"]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 4) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (enteredOtp.length === 5) {
      alert("OTP Submitted: " + enteredOtp);
    } else {
      alert("Please enter a 5-digit OTP.");
    }
  };

  return (
    <div className="h-screen p-[1%]">
      <Logo />
      <div className="my-auto flex h-[95%] w-[100%] flex-col items-center justify-center py-8">
        <div className="my-auto flex h-[100%] w-[80%] flex-col items-center justify-between">
          <div className="flex w-[100%] flex-col items-center justify-center">
            <h2 className="mb-[16px] text-center font-sans text-[27px]/[120%] font-normal text-Gold0">
              Verify your email address
            </h2>
            <p className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-Gray1">
              Enter the 5-digit code sent to <br />
              <span className="text-PriGold">johndoe@gmail.com</span>
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-[20px] mt-[30px] flex flex-row items-center justify-center">
              <p className="flex text-center font-sans text-[16px]/[120%] font-normal text-Red1">
                Oops! That was not right. Enter the correct code
              </p>
            </div>
            <form onSubmit={handleSubmit} className="">
              <div className="flex justify-center gap-5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    value={digit}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    maxLength={1}
                    className={`h-28 w-24 rounded-md border-2 border-Red1 text-center text-[37px] text-Red1 focus:outline-none ${digit ? "bg-Red2" : "bg-white"}`}
                    placeholder=""
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </form>
          </div>
          <div className="text-center">
            <h2 className="mt-[20px] text-center font-sans text-[16px]/[120%] font-normal text-Black1">
              You&apos;ve not yet received your code?
            </h2>
            <button>
              <h2 className="mt-[20px] text-center font-sans text-[16px]/[120%] font-normal text-PriGold">
                Resend code
              </h2>
            </button>
          </div>
          <div className="w-[45%] justify-center">
            <Button1
              text="Verify"
              className="mb-[20px] mt-[60px] w-[100%] self-center"
            />
            <h2 className="text-center font-sans text-[16px]/[120%] font-normal text-Black1">
              Not your email?
              <Link className="text-PriGold" href={"#"}>
                {" "}
                change email
              </Link>
            </h2>

            <div className="mt-[36px] flex flex-row items-center justify-center">
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
                <h1 className="text-[16px]/[120%] font-normal text-Gold1">
                  Back to Login
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
