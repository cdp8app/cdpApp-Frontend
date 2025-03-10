'use client'
import Logo from "@/app/Components/Logo"
import Button1 from "@/app/UsersAuthentication/Components/Button1";
import Link from "next/link";
import { useState } from "react"

export default function UnsuccessfulVerficationPage() {
    const [otp, setOtp] = useState<string[]>(["6", "7", "4", "6", "5"]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

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
            <div className="flex flex-col justify-center h-[95%] py-8 my-auto items-center w-[100%]">
                <div className=" flex flex-col justify-between h-[100%] my-auto items-center w-[80%]">
                    <div className=" flex flex-col items-center justify-center w-[100%]">
                        <h2 className="text-center text-Blue4 text-[36px]/[120%] mb-[16px] font-sans font-normal">
                            Verify your email address
                        </h2>
                        <p className="w-[60%] flex flex-col text-center text-Gray1 text-[21px]/[120%] font-sans font-normal">
                            Enter the 5-digit code sent to <br />
                            <span className="text-Blue2">johndoe@gmail.com</span>
                        </p>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row items-center justify-center mt-[30px] mb-[20px]">
                            <p className=" flex text-center text-Red1 text-[21px]/[120%] font-sans font-normal">
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
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        maxLength={1}
                                        className={`w-24 h-28 text-center text-[37px] text-Red1 border-2 border-Red1 rounded-md focus:outline-none
                                    ${digit ? "bg-Red2" : "bg-white"}`}
                                        placeholder=""
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                        </form>
                    </div>
                    <div className="text-center">
                        <h2 className="text-center text-Black1 text-[21px]/[120%] mt-[20px] font-sans font-normal">
                            You've not yet received your code?
                        </h2>
                        <button>
                            <h2 className="text-center text-Blue2 text-[21px]/[120%] mt-[20px] font-sans font-normal">
                                Resend code
                            </h2>
                        </button>
                    </div>
                    <div className="justify-center w-[45%]">
                        <Button1 text="Verify" className=" self-center mb-[20px] mt-[60px] w-[100%] " />
                        <h2 className="text-center text-Black1 text-[21px]/[120%] font-sans font-normal">
                            Not your email?
                            <Link className="text-Blue2" href={"#"}> change email</Link>
                        </h2>

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
