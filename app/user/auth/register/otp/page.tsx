"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/./contexts/AuthContext"; 

import Logo from "@/app/Components/Logo";
import Button1 from "@/app/user/Components/Button1";
import Link from "next/link";

export default function OTPVerification() {
  const router = useRouter();

  const { activateAccount, loading, error, clearError } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"default" | "success" | "error">("default");
  const [formError, setFormError] = useState("");
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("verifyOtpEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        router.push("/user/auth/register/successful");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 4) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    clearError();
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 5) {
      setFormError("Please enter the 5-digit code.");
      setStatus("error");
      return;
    }

    try {
      await activateAccount(enteredOtp);
      setStatus("success");
    } catch (err: any) {
      setFormError(err.message || "Oops! That was not right. Enter the correct code.");
      setStatus("error");
    } 
  };

  const getInputClasses = (digit: string) => {
    if (status === "success") return "h-28 w-24 rounded-md border border-Green1 text-center text-[47px] font-sans font-medium text-xl focus:bg-Green2 focus:outline-none bg-Green2";
    if (status === "error") return "h-28 w-24 rounded-md border-2 border-Red1 text-center text-[37px] text-Red1 focus:outline-none bg-Red2";
    return digit ? "bg-Gold3 border-Gold2 text-Gold0" : "border-Gold2 text-Gold0";
  };
  
  return (
    <div className="h-screen p-[1%]">
      {/* <div className="w-[100%] mb-0 flex justify-center"> */}
      <Logo />
      {/* </div> */}
      <div className="my-auto flex h-[90%] w-[100%] flex-col items-center justify-center py-4">
        <div className="my-auto flex h-[100%] w-[80%] flex-col items-center justify-between">
          <div className="flex w-[100%] flex-col items-center justify-center">

            <h2 className="mb-[16px] text-center font-sans text-[27px]/[120%] font-normal text-Gold0">
              Verify your email address
            </h2>

            {status === "success" && (
              <>
                <p className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-Gray2">
                If you are not automatically redirected in 5 seconds
                </p>
                <Link
                  href="/user/auth/login/register/successful"
                  className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-PriGold"
                >
                Click here to proceed
                </Link>
              </>
            )}

            {status !== "success" && (
              <p className="flex w-[60%] flex-col text-center font-sans text-[16px]/[120%] font-normal text-Gray1">
                Enter the 5-digit code sent to <br />
                <span className="text-PriGold">{email}</span>
              </p>
            )}           
          </div>

          <div className="flex flex-col justify-center">
            {status === "success" && (
              <div className="mb-[24px] flex flex-row items-center justify-center">
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
            )}

            {status === "error" && (formError || error) && (
              <div className="mb-[20px] mt-[30px] flex flex-row items-center justify-center">
                <p className="flex text-center font-sans text-[16px]/[120%] font-normal text-Red1">
                Oops! That was not right. Enter the correct code / {formError} / {error}
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="">
              <div className="flex justify-center gap-5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => {
                      inputRefs.current[index] = el!;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    className={`h-28 w-24 rounded-md font-sans text-[47px] border border-Gold2 text-center text-xl focus:bg-GoldenWhite focus:outline-none ${getInputClasses(digit)}`}
                  />
                ))}
              </div>

              {status !== "success" && (
                <div className="flex flex-col justify-center mt-[30px]">
                  <h2 className="text-center font-sans text-[16px]/[120%] font-normal text-Black1">
                      You&apos;ve not yet received your code?
                  </h2>
                  <Link href={"/user/auth/register/successful"} className="flex justify-center">
                    <h2 className="mt-[15px] text-center font-sans text-[16px]/[120%] font-normal text-PriGold">
                        Resend code
                    </h2>
                  </Link>

                  <div className="flex justify-center item-center w-[100%]">
                    <Button1 text="Verify" type="submit"
                      className="mb-[20px] mt-[60px] w-[100%] self-center" loading={loading}
                      disabled={loading} />
                  </div>
                </div>
              )}

            </form>
          </div>

          {status === "success" && (
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
          )}

          {status !== "success" && (
            <div>
              <h2 className="text-center font-sans text-[16px]/[120%] font-normal text-Gray2">
                  Not your email?
                <Link className="text-PriGold" href={"#"}>
                  {" "}
                    change email
                </Link>
              </h2>
              <div className="mt-[26px] flex flex-row items-center justify-center">
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
                  <h1 className="text-[16px]/[120%] font-sans font-normal text-Gold1">
                      Back to Login
                  </h1>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
