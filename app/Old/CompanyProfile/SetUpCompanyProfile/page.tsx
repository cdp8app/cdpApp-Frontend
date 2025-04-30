import React from "react";
import LogoComponent from "@/app/Components/Logo2";
import SetUpCompanyProfileForm from "./form";

const SetUpCompanyProfile = () => {
  return (
    <div className="h-[100%] bg-White p-[1%]">
      <LogoComponent />
      <div className="flex flex-col px-[20%] text-center">
        <div className="mb-[22.5px] mt-[36px]">
          <h1 className="font-sans text-[36px]/[120%] font-normal text-Gold1">
            Set up company profile
          </h1>
        </div>
        <div className="mb-[48px]">
          <h2 className="font-sans text-[16px]/[120%] text-Gray1">
            TAKE A MOMENT TO PROVIDE SOME INFORMATION ABOUT THE COMPANY
          </h2>
        </div>
        <div className="flex mb-[48px] flex-row justify-center items-center">
          <div className="flex h-[51px] w-[51px] items-center justify-center rounded-[999px] bg-PriGold">
            <p className="font-sans text-[16px]/[120%] text-GoldenWhite">1</p>
          </div>
          <div className="h-[2px] bg-PriGold w-[81px]"></div>
          <div className="h-[10px] w-[10px] bg-PriGold rounded-[5px]"></div>
          <div className="border-b-2 border-dashed border-PriGold w-[81px]"></div>
          <div className="flex h-[51px] w-[51px] items-center justify-center rounded-[999px] border-2 border-PriGold border-dashed ">
            <p className="font-sans text-[16px]/[120%] text-Gray2">2</p>
          </div>
        </div>

        <div className="mb-[12px] flex justify-start border-b-2 border-Gray1">
          <h1 className="p-[10px] font-sans text-[21px]/[120%] text-Gray1">
            Legal Information
          </h1>
        </div>
        <SetUpCompanyProfileForm />
      </div>
    </div>
  );
};

export default SetUpCompanyProfile;
