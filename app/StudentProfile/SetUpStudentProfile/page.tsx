import Logo from '@/app/Components/Logo'
import Link from 'next/link'
import React from 'react'

const SetUpStudentProfilePage = () => {
    return (
        <div className="p-[1%] h-screen" >
            <Logo />
            <div className='px-[20%]'>
                <div className="flex flex-row justify-start items-center mt-[36px] ">
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
    )
}

export default SetUpStudentProfilePage
