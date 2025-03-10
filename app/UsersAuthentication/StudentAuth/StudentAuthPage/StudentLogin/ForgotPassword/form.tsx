'use client'
import '../../../../../../app/globals.css'

export default function ForgotPasswordForm() {
  return (
    <form className='flex justify-center'>
      <div className='mb-[121px] mt-[96px] flex w-[100%] flex-row items-center border-b-[2px] border-Blue3 px-[4.91px] py-[4.91px]'>
        {/* <Image src={emailIcon} alt="Phone" className="mr-[8px] w-[22.18px] h-[17.31px]" /> */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
          className='mr-[8px] h-[24px] w-[24px] text-Blue4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
          />
        </svg>
        <input
          placeholder='Enter your email address'
          className='font-sans text-[21px] placeholder-Gray1 outline-none'
        />
      </div>
    </form>
  )
}
