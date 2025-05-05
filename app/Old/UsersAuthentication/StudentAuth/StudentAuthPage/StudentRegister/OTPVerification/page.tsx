"use client";
import Logo from "@/app/Components/Logo";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button1 from "@/app/user/Components/Button1";

type VerificationStatus = "success" | "error";

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [status, setStatus] = useState<VerificationStatus>("error");
  const { activateAccount, loading, error } = useAuth();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const enteredOtp = otp.join("");
    try {
      const response = await activateAccount(enteredOtp);
      console.log("Activation success:", response);
      setStatus("success");
    } catch (err) {
      console.error("Activation failed", err);
      setStatus("error");
    }
  };

  return (
    <div className="h-screen p-[2%]">
      <Logo />
      <div className="my-auto flex h-[85%] w-[100%] flex-col items-center justify-center py-8">

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-800">
            {error}
          </div>
        )}
      
        <div className="my-auto flex h-[100%] w-[80%] flex-col items-center justify-between">
          <div className="flex w-[100%] flex-col items-center justify-center">
            <h2 className="mb-[16px] text-center font-sans text-[27px]/[120%] font-normal text-Gold0">
              Verify your email address
            </h2>
            {status === "success" ? (
              <>
                <p className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-Gray2">
                    If you are not automatically redirected in 5 seconds
                </p>
                <Link
                  href="#"
                  className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-PriGold"
                >
                    Click here to proceed
                </Link>
              </>
            ) : (
              <p className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-Gray1">
              Enter the 5-digit code sent to <br />
                <span className="text-PriGold">johndoe@gmail.com</span>
              </p>
            )}
          </div>
            
          <div className="flex flex-col justify-center">
            {status === "success" ? (
              <div className="mb-[43px] flex flex-row items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="mr-[10px] size-8 text-Green1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="flex flex-col text-center font-sans text-[21px]/[120%] font-normal text-Green1">
                Verification successful
                </p>
              </div>
            ) : (
              <div className="mb-[20px] mt-[30px] flex items-center justify-center">
                <p className="text-[16px] text-Red1">
                  Oops! That was not right. Enter the correct code
                </p>
              </div>
            )}

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
                    className={`h-28 w-24 rounded-md border border-Green1 text-center text-[47px] font-sans font-medium text-xl focus:bg-Green2 focus:outline-none ${
                      status === "success"
                        ? "border-Green1 bg-Green2 text-xl"
                        : "border-Red1 bg-Red2 text-Red1"
                    }`}
                    // placeholder=" "
                    autoFocus={index === 0}
                    // readOnly
                  />
                ))}
              </div>

              {status === "error" ? (
                <><Button1
                  text="Verify"
                  loading={loading}
                  disabled={loading}
                  type="submit" /></>
              ) : null}

            </form>
          </div>

          {status === "error" ? (
            <div className="text-center">
              <h2 className="mt-[20px] text-[16px] text-Black1">
                You&apos;ve not yet received your code?
              </h2>
              <button>
                <h2 className="mt-[20px] text-[16px] text-PriGold">
                  Resend code
                </h2>
              </button>
              <h2 className="mt-[20px] text-[16px] text-Black1">
                Not your email?
                <Link className="text-PriGold" href="#">
                  {" "}
                  change email
                </Link>
              </h2>
            </div>
          ) : null}

          <div className="justify-center">
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
                <h1 className="text-[16px]/[120%] font-normal text-Gold1 font-sans">
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
