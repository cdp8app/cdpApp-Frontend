import Logo from '@/app/Components/Logo'
import Link from 'next/link'
import React from 'react'
import SetUpStudentProfileForm from './form'

const SetUpStudentProfilePage = () => {
    return (
        <div className="p-[1%] h-[100%] bg-BlueWhite" >
            <Logo />
            <div className='px-[20%]'>
                <div className="flex flex-row justify-start items-center mt-[36px] mb-[22.5px] ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-10 mr-[4px] text-Gray1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    <h1 className=" font-sans text-[36px]/[120%] text-Blue2 font-normal ">
                        Set up your profile
                    </h1>
                </div>
                <div className='mb-[66px]'>
                    <h2 className='font-sans text-[16px]/[120%] text-Gray1'>
                        TAKE A MOMENT TO PROVIDE SOME INFORMATION ABOUT YOURSELF
                    </h2>
                </div>
                <div className='border-b-2 border-Gray1 mb-[12px]'>
                    <h1 className='p-[10px] text-Gray1 font-sans text-[21px]/[120%] '>
                        Personal Information
                    </h1>
                </div>
                <SetUpStudentProfileForm/>
            </div>
        </div>
    )
}

export default SetUpStudentProfilePage
