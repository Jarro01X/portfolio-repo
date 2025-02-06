"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WorkExperience } from "@/components/sections/WorkExperience"
import { Skills } from "@/components/sections/Skills"
import { useEffect, useRef } from "react"

export default function Home() {
  const skillsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScrollToSkills = () => {
      if (skillsRef.current) {
        const navbarHeight = 56
        const yOffset = skillsRef.current.getBoundingClientRect().top + window.pageYOffset - navbarHeight
        window.scrollTo({ top: yOffset, behavior: "smooth" })
      }
    }

    if (window.location.hash === "#skills") {
      setTimeout(handleScrollToSkills, 0)
    }

    window.addEventListener("scrollToSkills", handleScrollToSkills)

    return () => {
      window.removeEventListener("scrollToSkills", handleScrollToSkills)
    }
  }, [])

  return (
    <main className="bg-black">
      <section id="introduction" className="pt-24 pb-16">
        <div className="px-4 max-w-[1400px] mx-auto">
          <div className="max-w-[800px]">
            <h1 className="text-5xl leading-none font-bold mb-4">Hi, I&apos;m Reynaldo Jarro</h1>
            <div className="space-y-4">
              <p className="text-base text-zinc-300 leading-relaxed">
                Welcome to my digital exhibit, where I showcase my interests and experience!
              </p>
              <p className="text-base text-zinc-400 leading-relaxed">
                My curiosity has taken me to Infrastructure, Cloud Computing, Full-Stack Development, and
                Cybersecurity. Recently, I've been diving into the world of AI as well.
              </p>
              <p className="text-base text-zinc-400 leading-relaxed">
                If you're here from a job application, I encourage you to explore my{" "}
                <Link href="/projects" className="text-blue-400 hover:text-blue-300">
                  Projects
                </Link>{" "}
                and{" "}
                <Link href="/reading-list" className="text-blue-400 hover:text-blue-300">
                  Reading List
                </Link>{" "}
                pages to get a deeper insight into my work and interests.
              </p>
            </div>
            <div className="flex gap-3 mt-8">
              <Button className="h-9 px-5 bg-[#4B67F5] hover:bg-[#4B67F5]/90 rounded-md">View Projects</Button>
              <Button variant="outline" className="h-9 px-5 border-zinc-800 text-white hover:bg-zinc-800 rounded-md">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
      <WorkExperience />
      <section id="skills" ref={skillsRef}>
        <Skills />
      </section>
    </main>
  )
}

