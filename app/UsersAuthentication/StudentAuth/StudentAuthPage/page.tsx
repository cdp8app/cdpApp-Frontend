import Logo from "@/app/Components/Logo";
import StudentAuthTogglePage from "../StudentAuthToggle/page";
import "../../../../app/globals.css";

export default function StudentAuthPage() {
  return (
    <div>
      <div className="flex h-screen w-screen max-w-[100%] flex-row justify-between p-[1%]">
        <div className="h-[100%] w-[50%] p-[10px]">
          <Logo />
          <div className="mt-[29px] flex flex-col items-center">
            <h1 className="font-sans text-[21px]/[120%]">Welcome!</h1>
            <StudentAuthTogglePage />
          </div>
        </div>
        <div className="h-screen w-[50%] rounded-[15px] bg-Gold0 p-[2%]">
          <div className="flex w-[100%] flex-col px-[10%]">
            {/* <h1 className="mb-[4px] font-sans text-[40px] font-semibold text-BlueWhite">
              Log in to Career X Hub
            </h1>
            <p className="font-sans text-[20px] font-light text-BlueWhite">
              Lorem Ipsum is simply
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
