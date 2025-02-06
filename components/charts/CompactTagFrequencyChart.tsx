import { useMemo } from "react"

interface TagFrequency {
  tag: string
  count: number
}

interface CompactTagFrequencyChartProps {
  articles: Array<{ tags: string[] }>
  limit?: number
}

export function CompactTagFrequencyChart({ articles, limit = 5 }: CompactTagFrequencyChartProps) {
  const tagFrequencies = useMemo(() => {
    const frequencies: Record<string, number> = {}
    articles.forEach((article) => {
      article.tags.forEach((tag) => {
        frequencies[tag] = (frequencies[tag] || 0) + 1
      })
    })
    return Object.entries(frequencies)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }, [articles, limit])

  const maxCount = Math.max(...tagFrequencies.map((tf) => tf.count))

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Top Tags</h2>
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center">
        {tagFrequencies.map(({ tag, count }) => (
          <>
            <span key={`${tag}-label`} className="text-sm text-zinc-400">
              {tag}
            </span>
            <div key={`${tag}-bar`} className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${(count / maxCount) * 100}%` }} />
            </div>
            <span key={`${tag}-count`} className="text-sm text-zinc-400">
              {count}
            </span>
          </>
        ))}
      </div>
    </div>
  )
}

