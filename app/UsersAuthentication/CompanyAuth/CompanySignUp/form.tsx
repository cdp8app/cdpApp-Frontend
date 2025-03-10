'use client'

import Label from "../../Components/Label"

export default function CompanySignUpForm() {
    // const onSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     console.log('Student Sign Up')
    // }
    return (
        <form className="flex flex-col justify-start ">
            <Label text="Company Name" className="text-start" />
            <input placeholder="Input the Company Name" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-black-900 placeholder-grey" />
            <Label text="Owner's Name" className="text-start" />
            <input placeholder="Input your Name" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-black-100 placeholder-grey" />
            <Label text="Email Address" className="text-start" />
            <input placeholder="Input email address" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-black-100 placeholder-grey" />
            <Label text="Phone Number" className="text-start" />
            <input placeholder="Input Phone Number" type="email" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-black-100 placeholder-grey" />
            <Label text="Password" className="text-start" />
            <input type="password" placeholder="Input password" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-slate-900 placeholder-grey" />
            <Label text="Confirm Password" className="text-start" />
            <input type="password" placeholder="Confirm password" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-slate-900 placeholder-grey" />
            <button className="border p-2 rounded-[30px] mb-[10px] border-none bg-green-100">
                <p className=" text-black font-sans text-lg">
                    Sign Up
                </p>
            </button>
            <div className="flex flex-row justify-between items-center mb-[10px]">
                <div className="w-[40%] h-[1px] bg-gray"></div>
                <p>Or</p>
                <div className="w-[40%] h-[1px] bg-gray"></div>
            </div>
            <button className="border-2 p-2 rounded-[30px] mb-[10px] border-none bg-green-100">
                <p className=" text-black font-sans text-lg">
                Sign Up With Google
                </p>
            </button>
        </form>
    )
}