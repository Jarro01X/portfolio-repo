import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Layout } from "@/components/layout/Layout"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reynaldo Jarro Portfolio",
  description: "My portfolios showcasing my interests, projects, and work interests",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  )
}

