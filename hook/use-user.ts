import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

export const useUserClient = () => {
  const { data: session } = useSession()
  return {
    id: session?.user.id,
    email: session?.user.email,
    username: session?.user.username,
    image: session?.user.image,
    role: session?.user.role,
    expires: session?.user.expires,
    session,
  }
}

export const useUserServer = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
