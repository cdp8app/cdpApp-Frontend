import StudentSignUpForm from "./form";

export default function StudentSignUp() {
    return (
        <div>
            <div className="h-screen w-screen flex justify-center items-center bg-[#0066CC]">
                <div className="shadow-xl p-[4] bg-white rounded-xl w-2/5">
                    <div className="pt-5 pl-5 pr-5 pb-5">
                        <h1 className="text-black text-3xl font-sans text-center font-medium mb-5">Sign Up</h1>
                        <StudentSignUpForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
