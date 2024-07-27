"use client"

import Image from "next/image"
import authImage from "@/public/auth-image.jpg"
import { handleOnLoadImage } from "@/utils/on-load-image"

const AuthImageLayout = () => {
  return (
    <div className="relative hidden h-full w-full md:col-span-8 lg:block">
      <Image
        src={authImage}
        alt="auth image image"
        fill
        className="size-full object-cover object-center opacity-0 transition-all duration-1000"
        onLoad={handleOnLoadImage}
      />
    </div>
  )
}

export default AuthImageLayout
