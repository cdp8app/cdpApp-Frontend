("");
("use client");
import Logo from "@/app/Components/Logo";
import Button1 from "@/app/UsersAuthentication/Components/Button1";

export default function NewPasswordCreatedPage() {
  return (
    <div className="max-h-[screen] p-[1%]">
      <Logo />
      <div className="flex h-[100%] w-[100%] justify-center">
        <div className="flex w-[80%] flex-col items-center justify-center py-[10%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="mb-[27px] h-[100px] w-[100px] text-Green1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h2 className="text-center font-sans text-[36px]/[120%] font-medium text-Blue4">
            New password created!
          </h2>
          <p className="mt-[16px] flex w-[60%] flex-col text-center font-sans text-[21px]/[120%] font-normal text-Gray1">
            That&apos;s it! You are done setting up a new password. You&apos;ll
            be
          </p>
          <div className="mb-[100px] flex flex-row">
            <p className="mr-1 font-sans text-[21px]/[120%] font-normal text-Gray1">
              redirected to login in
            </p>
            <p className="mr-1 font-sans text-[21px]/[120%] font-normal text-Blue2">
              3 seconds
            </p>
            <p className="font-sans text-[21px]/[120%] font-normal text-Gray1">
              or login below.
            </p>
          </div>
          <Button1 text="Login now" className="w-[45%]" />
        </div>
      </div>
    </div>
  );
}
