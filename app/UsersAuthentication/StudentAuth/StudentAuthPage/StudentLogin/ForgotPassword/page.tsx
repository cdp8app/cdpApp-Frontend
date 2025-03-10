;("")
;("use client")
import Logo from "@/app/Components/Logo"
import ForgotPasswordForm from "./form"
import Button1 from "@/app/UsersAuthentication/Components/Button1"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className='p-[1%]'>
      <Logo />
      <div className='flex flex-col justify-center px-[5%] pt-[3%]'>
        <h2 className='text-center font-sans text-[36px]/[120%] font-medium text-Blue4'>
          Passwords are really hard to remember, right?
          <br />
          Let&apos;s help you set up a new one ASAP!
        </h2>
        <h6 className='mt-[14px] text-center text-[21px]/[120%] text-Gray1'>
          Enter the email address linked to your account and we&apos;d send a
          <br />
          5-digit OTP that you&apos;d enter in the next screen
        </h6>
        <div className='flex w-[45%] flex-col justify-center self-center'>
          <ForgotPasswordForm />
          <Button1 text='Send OTP' className=' ' />
          <h1 className='mb-[40px] mt-[36px] text-center text-[21px]/[120%] text-Gray1'>
            Remembered your password?{" "}
            <button>
              <Link href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}>
                Login now
              </Link>
            </button>
          </h1>
          <Link
            href={"/UsersAuthentication/StudentAuth/StudentAuthPage"}
            className='text-center'
          >
            <h1 className='text-[21px]/[120%] font-normal text-Blue1'>
              Register instead
            </h1>
          </Link>
        </div>
      </div>
    </div>
  )
}
