""
'use client'
import Logo from "@/app/Components/Logo"
import Button1 from "@/app/UsersAuthentication/Components/Button1"
import Link from "next/link"
import NewPasswordForm from "./form"

export default function NewPasswordPage() {
    return (
        <div className="p-[1%]">
            <Logo />
            <div className=" flex flex-col px-[5%] justify-center pt-[3%]">

                <h2 className="text-center text-Blue4 text-[36px]/[120%] font-sans font-medium">
                    Set a new password
                </h2>
                <h6 className="text-center text-[21px]/[120%] mt-[14px] text-Gray1">
                    Set up a new password with at least 8 characters
                </h6>
                <div className=" flex flex-col self-center justify-center w-[45%]">
                    <NewPasswordForm />
                    <Button1 text="Set new password" className=" mt-[66px] mb-[14px] " />
                    <div className="flex flex-row justify-center items-center">
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
    )
}
