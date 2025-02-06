import { useMemo } from "react"

interface TagFrequency {
  tag: string
  count: number
}

interface TagFrequencyGraphProps {
  articles: Array<{ tags: string[] }>
}

export function TagFrequencyGraph({ articles }: TagFrequencyGraphProps) {
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
  }, [articles])

  const maxCount = Math.max(...tagFrequencies.map((tf) => tf.count))

  return (
    <div className="mb-8 lg:mb-0">
      <h2 className="text-xl font-semibold mb-4">Tag Frequency</h2>
      <div className="space-y-2">
        {tagFrequencies.map(({ tag, count }) => (
          <div key={tag} className="flex items-center">
            <span className="w-20 text-sm text-zinc-400">{tag}</span>
            <div className="flex-grow bg-zinc-800 h-6 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${(count / maxCount) * 100}%` }} />
            </div>
            <span className="w-8 text-right text-sm text-zinc-400 ml-2">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

