"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter()

  function handleLogout() {
    signOut({ redirect: false }).then(() => {
      router.push("/")
    })

    // toast({
    //   message: 'logout berhasil'
    // })
  }

  return (
    <Button variant="destructive" className="w-max" onClick={handleLogout}>
      logout
    </Button>
  )
}

export default LogoutButton
