"use client"

import { Button } from "@/components/ui/button"
import { Mail, Linkedin } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-4 max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Me</h1>
        <div className="space-y-8">
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center space-y-4">
            <Mail className="w-12 h-12 text-blue-500" />
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="text-zinc-400">reyrjarroneto@gmail.com</p>
            <Button
              onClick={() => (window.location.href = "mailto:reyrjarroneto@gmail.com")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Send Email
            </Button>
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 flex flex-col items-center space-y-4">
            <Linkedin className="w-12 h-12 text-blue-500" />
            <h2 className="text-xl font-semibold">LinkedIn</h2>
            <p className="text-zinc-400">Connect with me on LinkedIn</p>
            <Button
              onClick={() => window.open("https://www.linkedin.com/in/your-profile", "_blank")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

