import Logo from "@/app/Components/Logo";
import StudentAuthTogglePage from "../StudentAuthToggle/page";
import "../../../../app/globals.css"
import Image from "next/image";
import phoneIcon from "../../../../public/Images/Icons/phoneIcon.png";
import StudentOnbording1 from "../../../../public/Images/StudentOnbording1.png";

export default function StudentAuthPage() {
    return (
        <div>
            <div className="h-screen w-screen flex flex-row justify-between p-[1%] max-w-[100%]">
                <div className="h-[100%] w-[50%] p-[10px]">
                    <Logo />
                    <div className="mt-[29px] flex flex-col items-center">
                        <h1 className="font-sans text-3xl">
                            Welcome!
                        </h1>
                        <StudentAuthTogglePage />
                    </div>
                </div>
                <div className="h-[100%] w-[50%] bg-Blue4 rounded-[15px] p-[2%]">
                    <div className="flex flex-row justify-end items-center">
                        <Image src={phoneIcon} alt="Phone" className="mr-1 w-[14px] h-[14px]" />
                        <p className="font-sans text-BlueWhite text-[15px]">
                            +94 0116 789 754
                        </p>
                    </div>
                    <div className="flex flex-col px-[10%] w-[100%]">
                        <Image src={StudentOnbording1} alt="Student Onboaarding" className="mb-10 justify-around mx-auto" />
                        <h1 className="text-BlueWhite text-[40px] font-sans font-semibold mb-[4px]">
                            Log in to Career X Hub
                        </h1>
                        <p className="text-BlueWhite text-[20px] font-light font-sans">
                            Lorem Ipsum is simply
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
