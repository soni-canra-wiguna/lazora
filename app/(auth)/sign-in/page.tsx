import { useUserServer } from "@/hook/use-user"
import SignInForm from "@/components/auth/signin-form"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "login di lazora untuk mempermudah belanja",
}

const SignInPage = async () => {
  const session = await useUserServer()
  if (session) {
    redirect("/")
  }
  return <SignInForm />
}

export default SignInPage
