""
'use client'
import Logo from "@/app/Components/Logo"
import ForgotPasswordForm from "./form"
import Button1 from "@/app/UsersAuthentication/Components/Button1"
import Link from "next/link"

export default function ForgotPasswordPage() {
    return (
        <div className="p-[1%]">
            <Logo />
            <div className=" flex flex-col px-[5%] justify-center pt-[3%]">

                <h2 className="text-center text-Blue4 text-[36px]/[120%] font-sans font-medium">
                    Passwords are really hard to remember, right?<br />
                    Let's help you set up a new one ASAP!
                </h2>
                <h6 className="text-center text-[21px]/[120%] mt-[14px] text-Gray1">
                    Enter the email address linked to your account and we'd send a<br />
                    5-digit OTP that you'd enter in the next screen
                </h6>
                <div className=" flex flex-col self-center justify-center w-[45%]">
                    <ForgotPasswordForm />
                    <Button1 text="Send OTP" className=" " />
                    <h1 className="mt-[36px] mb-[40px] text-center text-[21px]/[120%] text-Gray1 ">
                        Remembered your password? <button>
                            <Link href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}>
                                Login now
                            </Link>
                        </button>
                    </h1>
                    <Link href={"/UsersAuthentication/StudentAuth/StudentAuthPage"} className="text-center">
                        <h1 className=" text-[21px]/[120%] text-Blue1 font-normal ">
                            Register instead
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}
