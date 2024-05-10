"use client"

import { store } from "@/redux/store"
import { Provider } from "react-redux"

interface ReduxProviderProps {
  children: React.ReactNode
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
