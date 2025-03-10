import Logo from "@/app/Components/Logo";
import StudentAuthTogglePage from "../StudentAuthToggle/page";
import "../../../../app/globals.css";
import Image from "next/image";
import phoneIcon from "../../../../public/Images/Icons/phoneIcon.png";
import StudentOnbording1 from "../../../../public/Images/StudentOnbording1.png";

export default function StudentAuthPage() {
  return (
    <div>
      <div className="flex h-screen w-screen max-w-[100%] flex-row justify-between p-[1%]">
        <div className="h-[100%] w-[50%] p-[10px]">
          <Logo />
          <div className="mt-[29px] flex flex-col items-center">
            <h1 className="font-sans text-3xl">Welcome!</h1>
            <StudentAuthTogglePage />
          </div>
        </div>
        <div className="h-[100%] w-[50%] rounded-[15px] bg-Blue4 p-[2%]">
          <div className="flex flex-row items-center justify-end">
            <Image
              src={phoneIcon}
              alt="Phone"
              className="mr-1 h-[14px] w-[14px]"
            />
            <p className="font-sans text-[15px] text-BlueWhite">
              +94 0116 789 754
            </p>
          </div>
          <div className="flex w-[100%] flex-col px-[10%]">
            <Image
              src={StudentOnbording1}
              alt="Student Onboaarding"
              className="mx-auto mb-10 justify-around"
            />
            <h1 className="mb-[4px] font-sans text-[40px] font-semibold text-BlueWhite">
              Log in to Career X Hub
            </h1>
            <p className="font-sans text-[20px] font-light text-BlueWhite">
              Lorem Ipsum is simply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
