"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TagFrequency {
  tag: string
  count: number
}

interface ExpandableTagCloudProps {
  readingItems: Array<{ tags: string[] }>
  initialLimit?: number
}

export function ExpandableTagCloud({ readingItems, initialLimit = 10 }: ExpandableTagCloudProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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

  const displayedTags = isExpanded ? tagFrequencies : tagFrequencies.slice(0, initialLimit)

  const totalItems = readingItems.length
  const uniqueTags = tagFrequencies.length

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tag Cloud</h2>
        <div className="text-sm text-zinc-400">
          {totalItems} items | {uniqueTags} unique tags
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {displayedTags.map(({ tag, count }) => (
          <span
            key={tag}
            className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs flex items-center"
            style={{
              fontSize: `${Math.max(0.75, Math.min(1.5, 0.75 + count * 0.25))}rem`,
            }}
          >
            {tag}
            <span className="ml-2 text-zinc-500 text-xs">{count}</span>
          </span>
        ))}
      </div>
      {tagFrequencies.length > initialLimit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-zinc-400 hover:text-white"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show All Tags
            </>
          )}
        </Button>
      )}
    </div>
  )
}

