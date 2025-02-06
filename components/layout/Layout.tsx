import type React from "react"
import { Navbar } from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-24 pb-16">{children}</main>
    </>
  )
}

