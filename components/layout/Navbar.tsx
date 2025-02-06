"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"

const getNavItems = (handleHomeClick: (e: React.MouseEvent<HTMLAnchorElement>) => void) => [
  { name: "Home", path: "/", onClick: handleHomeClick },
  { name: "Skills", path: "/#skills" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Reading List", path: "/reading-list" },
  { name: "Open Source", path: "/open-source" },
  { name: "Contact", path: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSkillsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname !== "/") {
      router.push("/")
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("scrollToSkills"))
      }, 100)
    } else {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <nav className="fixed w-full z-50 bg-black">
      <div className="px-4 flex h-14 items-center justify-start w-full">
        <div className="flex gap-4 items-center">
          {getNavItems(handleHomeClick).map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={item.onClick || (item.name === "Skills" ? handleSkillsClick : undefined)}
              className={`text-sm ${
                pathname === item.path ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

