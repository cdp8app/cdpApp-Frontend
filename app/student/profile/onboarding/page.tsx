import React from "react";
import SetUpStudentProfileForm from "./form";
import LogoComponent from "@/app/Components/Logo2";

const SetUpStudentProfilePage = () => {
  return (
    <div className="p-[1%] h-[100%] bg-White" >
      <LogoComponent />
      <div className='flex flex-col px-[20%] text-center'>
        <div className="mt-[36px] mb-[22.5px] ">
          <h1 className=" text-[36px]/[120%] text-Gold1 font-sans font-normal ">
            Set up your profile
          </h1>
        </div>
        <div className='mb-[66px]'>
          <h2 className='font-sans text-[16px]/[120%] text-Gray1'>
            TAKE A MOMENT TO PROVIDE SOME INFORMATION ABOUT YOURSELF
          </h2>
        </div>
        <div className='border-b-2 border-Gray1 mb-[12px]'>
          <h1 className='p-[10px] text-Gray1 font-sans text-[21px]/[120%] text-start'>
            Personal Information
          </h1>
        </div>
        <SetUpStudentProfileForm />
      </div>
    </div>
  );
};

export default SetUpStudentProfilePage;
