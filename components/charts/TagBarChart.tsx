"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface TagFrequency {
  tag: string
  count: number
}

interface TagBarChartProps {
  readingItems: Array<{ tags: string[] }>
  initialLimit?: number
  increment?: number
}

export function TagBarChart({ readingItems, initialLimit = 10, increment = 5 }: TagBarChartProps) {
  const [limit, setLimit] = useState(initialLimit)

  const tagFrequencies = useMemo(() => {
    const frequencies: Record<string, number> = {}
    readingItems.forEach((item) => {
      item.tags.forEach((tag) => {
        frequencies[tag] = (frequencies[tag] || 0) + 1
      })
    })
    return Object.entries(frequencies)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [readingItems])

  const displayedTags = tagFrequencies.slice(0, limit)
  const maxCount = Math.max(...displayedTags.map((tf) => tf.count))

  const handleViewMore = () => {
    setLimit((prevLimit) => Math.min(prevLimit + increment, tagFrequencies.length))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {displayedTags.map(({ tag, count }) => (
          <div key={tag} className="flex items-center">
            <div className="w-24 text-sm text-zinc-400 truncate" title={tag}>
              {tag}
            </div>
            <div className="flex-grow bg-zinc-800 h-6 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
            </div>
            <div className="w-8 text-right text-sm text-zinc-400 ml-2">{count}</div>
          </div>
        ))}
      </div>
      {limit < tagFrequencies.length && (
        <Button
          onClick={handleViewMore}
          variant="outline"
          size="sm"
          className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <ChevronDown className="w-4 h-4 mr-2" />
          View More
        </Button>
      )}
    </div>
  )
}

