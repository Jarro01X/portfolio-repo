import type React from "react"

export interface BlogPost {
  id: string
  title: string
  date: string
  readTime: string
  excerpt: string
  content: React.ReactNode
  coverImage: string
  tags: string[]
}

export const blogPosts: BlogPost[] = []

