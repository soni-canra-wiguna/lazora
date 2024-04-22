"use client"

import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export type AuthInputProps = {
  icon?: JSX.Element | any
  placeholder?: string
  revealPassword?: boolean
  focus?: boolean
} & InputProps

const AuthInput = ({
  icon,
  placeholder,
  revealPassword = false,
  focus = false,
  ...props
}: AuthInputProps) => {
  const [typePassword, setTypePassword] = useState("password")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus()
    }
  }, [focus])

  return (
    <div className="w-full h-auto relative">
      {icon}
      <Input
        {...props}
        ref={inputRef}
        className={cn(
          `rounded-full shadow-none hover:bg-secondary-foreground/10 focus:bg-secondary-foreground/10 p-5 focus:placeholder:text-transparent ${
            icon ? "pl-10" : "pl-6"
          }`,
          revealPassword && "pr-12"
        )}
        placeholder={placeholder}
        type={revealPassword ? typePassword : props.type}
      />
      {revealPassword &&
        (typePassword === "password" ? (
          <Eye
            onClick={() => setTypePassword("text")}
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 right-5 cursor-pointer"
            color="black"
          />
        ) : (
          <EyeOff
            onClick={() => setTypePassword("password")}
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 right-5 cursor-pointer"
            color="black"
          />
        ))}
    </div>
  )
}

export default AuthInput
