import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>
        HOME
      </h1>
      <div className="flex-row">
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
      </div>
    </div>
  );
}
