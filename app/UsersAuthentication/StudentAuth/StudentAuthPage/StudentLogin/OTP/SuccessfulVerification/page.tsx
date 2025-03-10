'use client'
import Logo from "@/app/Components/Logo"
import Button1 from "@/app/UsersAuthentication/Components/Button1";
import Link from "next/link";
import { useState } from "react"

export default function SuccessfulVerificationPage() {
    const [otp] = useState<string[]>(["6", "7", "4", "6", "5"]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;

        if (value && index < 4) {
            document.getElementById(`otp-input-${index + 1}`)?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
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
        <div className="p-[1%] h-screen">
            <Logo />
            <div className="flex flex-col justify-center h-[85%] py-8 my-auto items-center w-[100%]">
                <div className=" flex flex-col justify-between h-[100%] my-auto items-center w-[80%]">
                    <div className=" flex flex-col items-center justify-center w-[100%]">
                        <h2 className="text-center text-Blue4 text-[36px]/[120%] mb-[16px] font-sans font-normal">
                            Verify your email address
                        </h2>
                        <p className="w-[60%] flex flex-col text-center text-Gray1 text-[21px]/[120%] font-sans font-normal">
                            If you are not automatically redirected in  5 seconds
                        </p>
                        <Link href="#" className="text-Blue2 w-[60%] flex flex-col text-center text-[21px]/[120%] font-sans font-normal">
                            Click here to proceed
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row items-center justify-center mb-[43px]">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1"
                                stroke="currentColor"
                                className="size-6 text-Green1 mr-[10px]"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className=" flex flex-col text-center text-Green1 text-[27px]/[120%] font-sans font-normal">
                                Verification successful
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
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        maxLength={1}
                                        className={`w-24 h-28 text-[47px] text-center text-xl border border-Blue1 rounded-md focus:outline-none focus:bg-Blue3
                                    ${digit ? "bg-Blue3" : "bg-white"}`}
                                        placeholder="5"
                                        autoFocus={index === 0}
                                        readOnly
                                    />
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className="justify-center">
                        <div className="flex flex-row justify-center items-center mt-[36px] ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5 mr-[4px]"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                            <Link href={"/UsersAuthentication/StudentAuth/StudentAuthPage"} className="text-center">
                                <h1 className=" text-[21px]/[120%] text-Blue1 font-normal ">
                                    Back to Login
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
