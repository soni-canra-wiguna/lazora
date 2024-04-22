"use client"

import Image from "next/image"
import authImage from "@/public/auth-image.jpg"

const AuthImageLayout = () => {
  return (
    <div className="md:col-span-8 w-full h-full relative">
      <Image
        src={authImage}
        alt="auth image image"
        className="w-full h-full object-cover object-center"
      />
    </div>
  )
}

export default AuthImageLayout
