"use client"
import Logo from "@/app/Components/Logo"
import Link from "next/link"
import { useState } from "react"

export default function SuccessfulVerificationPage() {
  const [otp] = useState<string[]>(["6", "7", "4", "6", "5"])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value
    if (/[^0-9]/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    if (value && index < 4) {
      document.getElementById(`otp-input-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const enteredOtp = otp.join("")
    if (enteredOtp.length === 5) {
      alert("OTP Submitted: " + enteredOtp)
    } else {
      alert("Please enter a 5-digit OTP.")
    }
  }

  return (
    <div className='h-screen p-[1%]'>
      <Logo />
      <div className='my-auto flex h-[85%] w-[100%] flex-col items-center justify-center py-8'>
        <div className='my-auto flex h-[100%] w-[80%] flex-col items-center justify-between'>
          <div className='flex w-[100%] flex-col items-center justify-center'>
            <h2 className='mb-[16px] text-center font-sans text-[36px]/[120%] font-normal text-Blue4'>
              Verify your email address
            </h2>
            <p className='flex w-[60%] flex-col text-center font-sans text-[21px]/[120%] font-normal text-Gray1'>
              If you are not automatically redirected in 5 seconds
            </p>
            <Link
              href='#'
              className='flex w-[60%] flex-col text-center font-sans text-[21px]/[120%] font-normal text-Blue2'
            >
              Click here to proceed
            </Link>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='mb-[43px] flex flex-row items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1'
                stroke='currentColor'
                className='mr-[10px] size-6 text-Green1'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <p className='flex flex-col text-center font-sans text-[27px]/[120%] font-normal text-Green1'>
                Verification successful
              </p>
            </div>
            <form onSubmit={handleSubmit} className=''>
              <div className='flex justify-center gap-5'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type='text'
                    value={digit}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    maxLength={1}
                    className={`h-28 w-24 rounded-md border border-Blue1 text-center text-[47px] text-xl focus:bg-Blue3 focus:outline-none ${digit ? "bg-Blue3" : "bg-white"}`}
                    placeholder='5'
                    autoFocus={index === 0}
                    readOnly
                  />
                ))}
              </div>
            </form>
          </div>
          <div className='justify-center'>
            <div className='mt-[36px] flex flex-row items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mr-[4px] size-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5 8.25 12l7.5-7.5'
                />
              </svg>
              <Link
                href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}
                className='text-center'
              >
                <h1 className='text-[21px]/[120%] font-normal text-Blue1'>
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
