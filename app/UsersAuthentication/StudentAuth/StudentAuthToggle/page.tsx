"use client";
import { useState } from "react";
import "../../../../app/globals.css";
import StudentLoginForm from "../StudentAuthPage/StudentLogin/form";
import StudentRegisterForm from "../StudentAuthPage/StudentRegister/form";
import Button1 from "../../Components/Button1";
import Image from "next/image";
import appleIcon from "../../../../public/Images/Icons/appleIcon.png";
import googleIcon from "../../../../public/Images/Icons/googleIcon.png";

const StudentAuthTogglePage = () => {
  const [activeContent, setActiveContent] = useState<1 | 2>(1);
  const handleToggle = (content: 1 | 2) => {
    setActiveContent(content);
  };

  return (
    <div className="flex w-[75%] flex-col items-center p-6">
      <div className="mb-[20px] space-x-[10px] rounded-[30px] bg-Gold3 pb-[12px] pl-[18px] pr-[18px] pt-[12px]">
        <button
          onClick={() => handleToggle(1)}
          className={`rounded-[30px] px-[50px] py-[9.5px] font-sans text-[16px] transition-colors ${
            activeContent === 1 ? "bg-PriGold text-White" : "text-Gold1"
          } hover:bg-black`}
        >
          Login
        </button>

        <button
          onClick={() => handleToggle(2)}
          className={`rounded-[30px] px-[50px] py-[9.5px] font-sans text-[16px] transition-colors ${
            activeContent === 2 ? "bg-PriGold text-White" : "text-Gold1"
          } hover:bg-black`}
        >
          Register
        </button>
      </div>

      <div className="mt-[6px] w-[100%]">
        {activeContent === 1 ? (
          <div className="items-center" id="login-section">
            <p className="text-center font-sans text-[16px]">
              If you don&apos;t have an account registered,
            </p>
            <div className="text-center text-[16px]">
              <p className="mr-[4px] font-sans font-[16px] text-Blue0">
                You can
                <span> </span>
                <span>
                  <button
                    onClick={() => handleToggle(2)}
                    className="font-sans text-[16px] font-semibold text-Gold1"
                  >
                    Register here!
                  </button>
                </span>
              </p>
            </div>
            <StudentLoginForm />
            <div className="mb-[30px] w-[100%] items-end justify-end text-end">
              <button className="mx-[11px] my-[10px]">
                <h6 className="justify-end font-sans text-[12px] text-Gold1">
                  Forgot password?
                </h6>
              </button>
            </div>

            <Button1 text="Login" className=" " />
            <h1 className="my-6 w-[100%] text-center font-sans text-[16px] font-medium text-Gray1">
              or continue with
            </h1>
            <div className="w-[100%] justify-center text-center">
              <button className="h-[36.34px] w-[36.34px] rounded-[50%] bg-Black1">
                <Image
                  src={appleIcon}
                  alt="AppleLogo"
                  className="m-auto h-[20.5px] w-[18.17px]"
                />
              </button>
              <button className="ml-[19.94px]">
                <Image src={googleIcon} alt="GoogleLogo" className="" />
              </button>
            </div>
          </div>
        ) : (
          <div className="items-center" id="register-section">
            <p className="text-center font-sans text-[16px]">
              Already have an account registered?
            </p>
            <div className="text-center text-[16px]">
              <p className="mr-[4px] font-sans font-[16px] text-Blue0">
                You can
                <span> </span>
                <span>
                  <button
                    onClick={() => handleToggle(1)}
                    className="font-sans text-[16px] font-semibold text-Gold1"
                  >
                    Login here!
                  </button>
                </span>
              </p>
            </div>
            <StudentRegisterForm />
            <Button1 text="Register" className=" " />
            <h1 className="mb-[15px] mt-6 w-[100%] text-center font-sans text-[16px] font-medium text-Gray1">
              or continue with
            </h1>
            <div className="w-[100%] justify-center text-center">
              <button className="h-[36.34px] w-[36.34px] rounded-[50%] bg-Black1">
                <Image
                  src={appleIcon}
                  alt="AppleLogo"
                  className="m-auto h-[20.5px] w-[18.17px]"
                />
              </button>
              <button className="ml-[19.94px]">
                <Image src={googleIcon} alt="GoogleLogo" className="" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAuthTogglePage;
