"use client";
import { useEffect, useState } from "react";
import "../globals.css";
import StudentLoginForm from "../user/auth/login/form";
import StudentRegisterForm from "../user/auth/register/form";
import Image from "next/image";
import appleIcon from "../../../../public/Images/Icons/appleIcon.png";
import googleIcon from "../../../../public/Images/Icons/googleIcon.png";
import { useParams } from "next/navigation";

type Props = {
  activeContent: 1 | 2;
  onToggle: (content: 1 | 2) => void;
  redirectPath?: string | null;
};

const StudentAuthTogglePage = ({ activeContent, onToggle }: Props) => {

  const [userType, setUserType] = useState<"student" | "company" | null>(null);
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType === "student" || storedUserType === "company") {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <div className="flex w-[75%] flex-col items-center p-6">
      <div className="hidden lg:block mb-[20px] flex-row space-x-[5px] rounded-[30px] pl-[10px] pr-[10px] bg-Gold3 pb-[12px] pt-[12px]">
        <button
          onClick={() => onToggle(1)}
          className={`rounded-[30px] px-[50px] py-[9.5px] font-sans text-[16px] transition-colors ${
            activeContent === 1 ? "bg-PriGold text-White" : "text-Gold1"
          } hover:bg-black`}
        >
          Login
        </button>

        <button
          onClick={() => onToggle(2)}
          className={`rounded-[30px] px-[50px] py-[9.5px] font-sans text-[16px] transition-colors ${
            activeContent === 2 ? "bg-PriGold text-White" : "text-Gold1"
          } hover:bg-black`}
        >
          Register
        </button>
      </div>

      <div className="mt-[6px] w-full">
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
                    onClick={() => onToggle(2)}
                    className="font-sans text-[16px] font-semibold text-Gold1"
                  >
                    Register here!
                  </button>
                </span>
              </p>
            </div>
            <StudentLoginForm userType={userType} />
            {/* <div className="mb-[30px] w-[100%] items-end justify-end text-end">
              <button className="mx-[11px] my-[10px]">
                <h6 className="justify-end font-sans text-[12px] text-Gold1">
                  Forgot password?
                </h6>
              </button>
            </div> */}
            {/* <h1 className="my-6 w-[100%] text-center font-sans text-[16px] font-medium text-Gray1">
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
            </div> */}
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
                    onClick={() => onToggle(1)}
                    className="font-sans text-[16px] font-semibold text-Gold1"
                  >
                    Login here!
                  </button>
                </span>
              </p>
            </div>
            <StudentRegisterForm />
            {/* <h1 className="mb-[15px] mt-6 w-[100%] text-center font-sans text-[16px] font-medium text-Gray1">
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
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAuthTogglePage;
