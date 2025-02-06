"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { CalendarIcon, Clock3, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "../blog-data"

export default function BlogPost() {
  const params = useParams()
  const post = blogPosts.find((post) => post.id === params.id)

  if (!post) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="px-4 max-w-[800px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="px-4 max-w-[800px] mx-auto">
        <Link href="/blog" className="text-blue-400 hover:text-blue-300 flex items-center mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <article>
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={`Cover image for ${post.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8">
            <div className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock3 className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">{post.content}</div>
        </article>
      </div>
    </main>
  )
}

