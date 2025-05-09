import StudentRegisterForm from "./form"

export default function StudentRegisterPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Student Registration</h1>
      <div className="flex justify-center">
        <StudentRegisterForm />
      </div>
    </div>
  )
}
