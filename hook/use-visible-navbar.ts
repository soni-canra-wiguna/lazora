"use client"

import { useEffect, useState } from "react"

export default function useVisibleNavbar() {
  const [prevScroll, setPrevScroll] = useState<number>(window?.scrollY)
  const [visible, setVisible] = useState<boolean>(true)

  const handleScroll = () => {
    const currentScroll = window?.scrollY
    if (prevScroll > currentScroll) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    setPrevScroll(currentScroll)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    // cleaning listener
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScroll])

  return {
    visible,
  }
}
