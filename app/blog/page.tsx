"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarIcon, Clock3, X, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { blogPosts } from "./blog-data"

export default function BlogPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => selectedTags.length === 0 || selectedTags.every((tag) => post.tags.includes(tag)))
  }, [selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-4 max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-center">Blog</h1>

        <div className="mb-8 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-full">
            <Button
              onClick={() => setShowTagFilter(!showTagFilter)}
              variant="outline"
              size="sm"
              className={`
                h-9 px-3 border-zinc-800
                ${showTagFilter ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}
              `}
            >
              <Tag className="w-4 h-4 mr-2" />
              {showTagFilter ? "Hide Tags" : "Show Tags"}
            </Button>
          </div>

          {showTagFilter && (
            <>
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1 text-xs rounded-full transition-colors
                      ${
                        selectedTags.includes(tag)
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-zinc-400 hover:text-white flex items-center"
                >
                  Clear filters <X className="w-4 h-4 ml-1" />
                </button>
              )}
            </>
          )}
        </div>

        <div className="space-y-12">
          {filteredPosts.map((post) => (
            <article key={post.id} className="border border-zinc-800 rounded-lg p-6 space-y-4">
              <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold">
                <Link href={`/blog/${post.id}`} className="hover:text-blue-400 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
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
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`
                      px-3 py-1 rounded-full text-xs
                      ${selectedTags.includes(tag) ? "bg-blue-600 text-white" : "bg-zinc-900 text-zinc-400"}
                    `}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

