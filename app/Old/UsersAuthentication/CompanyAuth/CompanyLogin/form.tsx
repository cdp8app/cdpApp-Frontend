"use client";
import Label from "../../Components/Label";

export default function CompanyLoginForm() {
  // const onSubmit = (e: React.FormEvent) => {
  //     e.preventDefault()
  //     console.log('Student Login')
  // }
  return (
    <form className="flex flex-col justify-start">
      <Label text="Email Address" className="text-start" />
      <input
        placeholder="Input your email address"
        className="border-black-300 font-black-100 placeholder-grey mb-[10px] rounded-xl border p-2 font-serif outline-none"
      />
      <Label text="Password" className="text-start" />
      <input
        type="password"
        placeholder="Input password"
        className="border-black-300 font-slate-900 placeholder-grey mb-[10px] rounded-xl border p-2 font-serif outline-none"
      />
      <button className="mb-[10px] rounded-[30px] border border-none bg-green-100 p-2">
        <p className="font-sans text-lg text-black">Login</p>
      </button>
      <div className="mb-[10px] flex flex-row items-center justify-between">
        <div className="bg-gray h-[1px] w-[40%]"></div>
        <p>Or</p>
        <div className="bg-gray h-[1px] w-[40%]"></div>
      </div>
      <button className="mb-[10px] rounded-[30px] border-2 border-none bg-green-100 p-2">
        <p className="font-sans text-lg text-black">Login With Google</p>
      </button>
    </form>
  );
}
