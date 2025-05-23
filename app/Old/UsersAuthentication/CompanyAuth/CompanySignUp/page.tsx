import CompanySignUpForm from "./form";

export default function StudentSignUp() {
  return (
    <div>
      <div className="flex h-screen w-screen items-center justify-center bg-[#0066CC]">
        <div className="w-2/5 rounded-xl bg-white p-[4] shadow-xl">
          <div className="pb-5 pl-5 pr-5 pt-5">
            <h1 className="mb-5 text-center font-sans text-3xl font-medium text-black">
              Sign Up
            </h1>
            <CompanySignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
