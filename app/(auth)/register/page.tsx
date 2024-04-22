import { useUserServer } from "@/hook/use-user"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import RegisterForm from "../_components/register-form"

export const metadata: Metadata = {
  title: "Register",
  description: "Daftar untuk bisa login dan berbelanja di lozora",
}

const RegisterPage = async () => {
  const session = await useUserServer()
  if (session) {
    redirect("/")
  }
  return <RegisterForm />
}

export default RegisterPage
