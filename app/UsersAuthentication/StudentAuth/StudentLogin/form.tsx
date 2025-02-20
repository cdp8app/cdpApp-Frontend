'use client'
import Label from "../../Components/Label"

export default function StudentLoginForm() {
    // const onSubmit = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     console.log('Student Login')
    // }
    return (
        <form className="flex flex-col justify-start ">
            <Label text="Email Address" className="text-start" />
            <input placeholder="Input your email address" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-black-100 placeholder-grey" />
            <Label text="Password" className="text-start" />
            <input type="password" placeholder="Input password" className="border p-2 rounded-xl mb-[10px] outline-none border-black-300 font-serif font-slate-900 placeholder-grey" />
            <button className="border p-2 rounded-[30px] mb-[10px] border-none bg-green-100">
                <p className=" text-black font-sans text-lg">
                    Login
                </p>
            </button>
            <div className="flex flex-row justify-between items-center mb-[10px]">
                <div className="w-[40%] h-[1px] bg-gray"></div>
                <p>Or</p>
                <div className="w-[40%] h-[1px] bg-gray"></div>
            </div>
            <button className="border-2 p-2 rounded-[30px] mb-[10px] border-none bg-green-100">
                <p className=" text-black font-sans text-lg">
                    Login With Google
                </p>
            </button>
        </form>
    )
}