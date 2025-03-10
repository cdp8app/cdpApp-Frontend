import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row w-full bg-black h-screen">
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="p-10 w-1/2 h-1/3 flex-col rounded-[30px] bg-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:delay-150">
            <h1 className="font-serif font-bold text-yellow-300 text-[30px] mb-5">
              Student
            </h1>
            {/* <h2>
              Whether you're looking for the perfect internship or seeking guidance to level up your skills, we're here to help you every step of the way.
            </h2> */}
            <div className="flex flex-row justify-between w-full">
              <button className="bg-yellow-300 p-4 w-[48%] justify-center flex rounded-[35px] hover:bg-gray-400">
                <Link className="text-black font-semibold font-sans" href="/UsersAuthentication/StudentAuth/StudentSignUp">
                  Sign Up
                </Link>
              </button>
              <button className="bg-yellow-300 p-4 w-[48%] justify-center flex rounded-[35px] hover:bg-gray-400">
                <Link className="text-black font-semibold font-sans" href="/UsersAuthentication/StudentAuth/StudentLogin">
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <div className="p-10 w-1/2 h-1/3 flex-col rounded-[30px] bg-yellow-400 flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:delay-300">
            <h1 className="font-serif text-black font-bold text-[30px] mb-5">
              Company
            </h1>
            <div className="flex flex-row justify-between w-full">
              <button className="bg-black p-4 w-[48%] justify-center flex rounded-[35px] hover:bg-gray-400">
                <Link className="text-yellow-300 font-sans" href="/UsersAuthentication/CompanyAuth/CompanySignUp">
                  Sign Up
                </Link>
              </button>
              <button className="bg-black p-4 w-[48%] justify-center flex rounded-[35px] hover:bg-gray-400">
                <Link className="text-yellow-300 font-sans" href="/UsersAuthentication/CompanyAuth/CompanyLogin">
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <h1>
        HOME
      </h1>
      <div className="flex flex-col">
        <div>
          <Link className="font-black" href="/UsersAuthentication/StudentAuth/StudentSignUp">
            Student Sign Up Link
          </Link>
        </div>
        <div>
          <Link className="font-black" href="/UsersAuthentication/StudentAuth/StudentLogin">
            Student Login Link
          </Link>
        </div>
        <div>
          <Link className="font-black" href="/UsersAuthentication/CompanyAuth/CompanyLogin">
            Company Login Link
          </Link>
        </div>
        <div>
          <Link className="font-black" href="/UsersAuthentication/CompanyAuth/CompanySignUp">
            Company Sign Up Link
          </Link>
        </div>
      </div> */}
    </div>
  );
}
