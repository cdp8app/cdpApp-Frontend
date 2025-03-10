'use client'
import { useState } from "react";
import "../../../../app/globals.css"
import StudentSignUpForm from "../StudentAuthPage/StudentLogin/form";
import StudentLoginForm from "../StudentAuthPage/StudentLogin/form";
import StudentRegisterForm from "../StudentAuthPage/StudentRegister/form";
import Button1 from "../../Components/Button1";
import Image from "next/image";
import appleIcon from "../../../../public/Images/Icons/appleIcon.png"
import googleIcon from "../../../../public/Images/Icons/googleIcon.png"

const StudentAuthTogglePage = () => {
  const [activeContent, setActiveContent] = useState<1 | 2>(1);
  const handleToggle = (content: 1 | 2) => {
    setActiveContent(content);
  };

  return (
    <div className="flex flex-col items-center p-6 w-[75%]">
      <div className="space-x-[10px] bg-Blue3 pt-[12px] pb-[12px] pl-[18px] pr-[18px] rounded-[30px] mb-[20px]">
        <button
          onClick={() => handleToggle(1)}
          className={`py-[9.5px] px-[50px] rounded-[30px] font-sans text-[16px] transition-colors ${activeContent === 1
            ? "bg-Blue2 text-White"
            : "text-Blue2"
            } hover:bg-blue-600`}
        >
          Login
        </button>

        <button
          onClick={() => handleToggle(2)}
          className={`py-[9.5px] px-[50px] rounded-[30px] font-sans text-[16px] transition-colors ${activeContent === 2
            ? "bg-Blue2 text-White"
            : "text-Blue2"
            } hover:bg-blue-600`}
        >
          Register
        </button>
      </div>

      <div className="mt-[6px] w-[100%]">
        {activeContent === 1 ? (
          <div className="items-center" id="login-section">
            <p className="text-center font-sans text-[16px]">
              If you don't have an account registered,
            </p>
            <div className="text-center text-[16px]">
              <p className="font-sans font-[16px] text-Blue0 mr-[4px]">
                You can
                <span> </span>
                <span>
                  <button
                    onClick={() => handleToggle(2)}
                    className="font-sans text-[16px] text-Blue1 font-semibold"
                  >
                    Register here!
                  </button>
                </span>
              </p>
            </div>
            <StudentLoginForm />
            <div className="justify-end items-end text-end w-[100%] mb-[48.96px]">
              <button className="my-[10px] mx-[11px]">
                <h6 className="text-Blue1 font-sans text-[16px] justify-end">
                  Forgot password?
                </h6>
              </button>
            </div>

            <Button1 text="Login" className=" " />
            <h1 className="text-center text-Gray1 font-medium text-[16px] font-sans w-[100%] my-6">
              or continue with
            </h1>
            <div className="text-center w-[100%] justify-center">
              <button className="bg-Black1 w-[36.34px] h-[36.34px] rounded-[50%] ">
                <Image src={appleIcon} alt="AppleLogo" className="m-auto w-[18.17px] h-[20.5px] " />
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
              <p className="font-sans font-[16px] text-Blue0 mr-[4px]">
                You can
                <span> </span>
                <span>
                  <button
                    onClick={() => handleToggle(1)}
                    className="font-sans text-[16px] text-Blue1 font-semibold"
                  >
                    Login here!
                  </button>
                </span>
              </p>
            </div>
            <StudentRegisterForm />
            <Button1 text="Register" className=" " />
            <h1 className="text-center text-Gray1 font-medium text-[16px] font-sans w-[100%] mt-6 mb-[15px]">
              or continue with
            </h1>
            <div className="text-center w-[100%] justify-center">
              <button className="bg-Black1 w-[36.34px] h-[36.34px] rounded-[50%] ">
                <Image src={appleIcon} alt="AppleLogo" className="m-auto w-[18.17px] h-[20.5px] " />
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
