"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

const SessionClientProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default SessionClientProvider