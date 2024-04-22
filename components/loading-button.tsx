"use client"

import React from "react"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { ButtonProps } from "./ui/button"

type LoadingButtonProps = {
  children: React.ReactNode
  loading?: boolean
} & ButtonProps

const LoadingButton = ({ children, loading, ...props }: LoadingButtonProps) => {
  return (
    <Button disabled={loading ? true : false} {...props}>
      {children}
      {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  )
}

export default LoadingButton
