"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Tag, X, User, Book, Newspaper, BarChart2 } from "lucide-react"
import { TagBarChart } from "@/components/charts/TagBarChart"

interface ReadingItem {
  id: string
  title: string
  url: string
  authors: string[]
  tags: string[]
  type: "article" | "book"
  company?: string
}

const readingItems: ReadingItem[] = [
  {
    id: "ai-data-protection",
    title: "The Evolving Role of AI in Data Protection",
    url: "https://www.crowdstrike.com/en-us/blog/the-evolving-role-of-ai-in-data-protection/",
    authors: ["Drew Bagley", "Christoph Bausewein"],
    tags: ["AI", "Security", "Data Protection", "Privacy"],
    type: "article",
    company: "Crowdstrike",
  },
  {
    id: "platform-engineering-journey",
    title: "Building Paved Paths: The Journey to Platform Engineering",
    url: "https://devblogs.microsoft.com/engineering-at-microsoft/building-paved-paths-the-journey-to-platform-engineering/",
    authors: ["Microsoft Engineering"],
    tags: ["Platform Engineering", "DevOps", "Best Practices", "Infrastructure"],
    type: "article",
    company: "Microsoft",
  },
  {
    id: "meta-data-lineage",
    title: "How Meta Discovers Data Flows via Lineage at Scale",
    url: "https://engineering.fb.com/2025/01/22/security/how-meta-discovers-data-flows-via-lineage-at-scale/",
    authors: ["Meta Engineering"],
    tags: ["Data Engineering", "Scalability", "Security", "Data Lineage"],
    type: "article",
    company: "Meta",
  },
  {
    id: "glean-code-indexing",
    title: "Glean: Open Source Code Indexing",
    url: "https://engineering.fb.com/2024/12/19/developer-tools/glean-open-source-code-indexing/",
    authors: ["Meta Engineering"],
    tags: ["Developer Tools", "Open Source", "Code Indexing", "Search"],
    type: "article",
    company: "Meta",
  },
  {
    id: "strobelight-profiling",
    title: "Strobelight: A Profiling Service Built on Open Source Technology",
    url: "https://engineering.fb.com/2025/01/21/production-engineering/strobelight-a-profiling-service-built-on-open-source-technology/",
    authors: ["Meta Engineering"],
    tags: ["Performance", "Profiling", "Open Source", "Production Engineering"],
    type: "article",
    company: "Meta",
  },
  {
    id: "meta-data-logs",
    title: "Data Logs: The Latest Evolution in Meta's Access Tools",
    url: "https://engineering.fb.com/2025/02/04/security/data-logs-the-latest-evolution-in-metas-access-tools/",
    authors: ["Meta Engineering"],
    tags: ["Security", "Data Access", "Logging", "Monitoring"],
    type: "article",
    company: "Meta",
  },
  {
    id: "roce-network-ai",
    title: "RoCE Network: Distributed AI Training at Scale",
    url: "https://engineering.fb.com/2024/08/05/data-center-engineering/roce-network-distributed-ai-training-at-scale/",
    authors: ["Meta Engineering"],
    tags: ["AI", "Distributed Systems", "Networking", "Infrastructure"],
    type: "article",
    company: "Meta",
  },
  {
    id: "malware-analysis",
    title: "Malware NodeStealer & Ducktail Analysis",
    url: "https://engineering.fb.com/2023/05/03/security/malware-nodestealer-ducktail/",
    authors: ["Meta Engineering"],
    tags: ["Security", "Malware Analysis", "Threat Detection", "Node.js"],
    type: "article",
    company: "Meta",
  },
  {
    id: "designing-distributed-systems",
    title: "Designing Distributed Systems, 2nd Edition",
    url: "https://www.oreilly.com/library/view/designing-distributed-systems/9781098156343/",
    authors: ["Brendan Burns"],
    tags: ["Distributed Systems", "System Design", "Kubernetes", "Containers", "Architecture"],
    type: "book",
  },
  {
    id: "foundations-scalable-systems",
    title: "Foundations of Scalable Systems",
    url: "https://www.oreilly.com/library/view/foundations-of-scalable/9781098106058/",
    authors: ["Ian Gorton"],
    tags: ["System Design", "Distributed Systems", "Scalability", "Architecture"],
    type: "book",
  },
  {
    id: "hacking-apis",
    title: "Hacking APIs",
    url: "https://nostarch.com/hacking-apis",
    date: "2024-02-05",
    authors: ["Corey Ball"],
    tags: ["Security", "APIs", "Penetration Testing", "Web Security"],
    type: "book",
  },
  {
    id: "clean-code",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    date: "2024-02-05",
    authors: ["Robert C. Martin"],
    tags: ["Clean Code", "Best Practices", "Software Engineering", "Agile"],
    type: "book",
  },
  {
    id: "black-hat-python",
    title: "Black Hat Python, 2nd Edition",
    url: "https://nostarch.com/black-hat-python2E",
    date: "2024-02-05",
    authors: ["Justin Seitz", "Tim Arnold"],
    tags: ["Python", "Security", "Penetration Testing", "Hacking"],
    type: "book",
  },
  {
    id: "clean-architecture",
    title: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    url: "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164",
    date: "2024-02-05",
    authors: ["Robert C. Martin"],
    tags: ["Architecture", "Clean Code", "Software Design", "Best Practices"],
    type: "book",
  },
  {
    id: "fundamentals-software-architecture",
    title: "Fundamentals of Software Architecture",
    url: "https://www.oreilly.com/library/view/fundamentals-of-software/9781492043447/",
    date: "2024-02-05",
    authors: ["Mark Richards", "Neal Ford"],
    tags: ["Architecture", "Software Design", "System Design", "Best Practices"],
    type: "book",
  },
  {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    url: "https://dataintensive.net/",
    date: "2024-02-05",
    authors: ["Martin Kleppmann"],
    tags: ["Distributed Systems", "Data Engineering", "System Design", "Architecture"],
    type: "book",
  },
  {
    id: "web-application-hackers-handbook",
    title: "The Web Application Hacker's Handbook",
    url: "https://www.amazon.com/Web-Application-Hackers-Handbook-Exploiting/dp/1118026470",
    date: "2024-02-05",
    authors: ["Dafydd Stuttard", "Marcus Pinto"],
    tags: ["Security", "Web Security", "Penetration Testing", "Hacking"],
    type: "book",
  },
  {
    id: "designing-secure-software",
    title: "Designing Secure Software",
    url: "https://nostarch.com/designing-secure-software",
    date: "2024-02-05",
    authors: ["Loren Kohnfelder"],
    tags: ["Security", "Software Design", "Best Practices", "Architecture"],
    type: "book",
  },
  {
    id: "1",
    title: "Command Line Interface Guidelines",
    url: "https://clig.dev/",
    date: "2023-07-15",
    authors: ["Aanand Prasad", "Ben Firshman", "Carl Tashian", "Eva Parish"],
    tags: ["CLI", "UX", "Design", "Development"],
    type: "article",
  },
  {
    id: "2",
    title: "UX Patterns for CLI Tools",
    url: "https://lucasfcosta.com/2022/06/01/ux-patterns-cli-tools.html",
    date: "2023-07-10",
    authors: ["Lucas F. Costa"],
    tags: ["CLI", "UX", "Patterns", "Development"],
    type: "article",
  },
]

type ReadingItemType = "all" | "article" | "book"

export default function ReadingListPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [selectedType, setSelectedType] = useState<ReadingItemType>("all")
  const [showTagChart, setShowTagChart] = useState(false)

  const filteredItems = useMemo(() => {
    return readingItems.filter(
      (item) =>
        (selectedType === "all" || item.type === selectedType) &&
        (selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag))),
    )
  }, [selectedTags, selectedType])

  const filteredItemsByType = useMemo(() => {
    return readingItems.filter((item) => selectedType === "all" || item.type === selectedType)
  }, [selectedType])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    filteredItemsByType.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [filteredItemsByType])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-4 max-w-[800px] mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Reading List</h1>
        <p className="text-zinc-400 text-center mb-8">
          A curated collection of articles and books I've been reading recently. Explore topics in software development,
          security, and system design.
        </p>

        <div className="mb-8 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center w-full space-x-2">
            <Button
              onClick={() => {
                setSelectedType("all")
                setSelectedTags([])
              }}
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              className="h-9 px-3"
            >
              All
            </Button>
            <Button
              onClick={() => {
                setSelectedType("article")
                setSelectedTags([])
              }}
              variant={selectedType === "article" ? "default" : "outline"}
              size="sm"
              className="h-9 px-3"
            >
              <Newspaper className="w-4 h-4 mr-2" />
              Articles
            </Button>
            <Button
              onClick={() => {
                setSelectedType("book")
                setSelectedTags([])
              }}
              variant={selectedType === "book" ? "default" : "outline"}
              size="sm"
              className="h-9 px-3"
            >
              <Book className="w-4 h-4 mr-2" />
              Books
            </Button>
          </div>

          <div className="flex items-center justify-center w-full space-x-2">
            <Button
              onClick={() => setShowTagChart(!showTagChart)}
              variant="outline"
              size="sm"
              className={`
                h-9 px-3 border-zinc-800 force-rounded
                ${showTagChart ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}
              `}
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              {showTagChart ? "Hide Tag Chart" : "Show Tag Chart"}
            </Button>
            <Button
              onClick={() => setShowTagFilter(!showTagFilter)}
              variant="outline"
              size="sm"
              className={`
                h-9 px-3 border-zinc-800 force-rounded
                ${showTagFilter ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}
              `}
            >
              <Tag className="w-4 h-4 mr-2" />
              {showTagFilter ? "Hide Tags" : "Show Tags"}
            </Button>
          </div>

          {showTagChart && (
            <div className="w-full mt-4">
              <TagBarChart readingItems={filteredItemsByType} initialLimit={10} increment={5} />
            </div>
          )}

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

        <div className="space-y-6">
          {filteredItems.map((item) => (
            <article key={item.id} className="border border-zinc-800 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors flex items-center"
                  >
                    {item.title}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </h2>
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${
                      item.type === "article"
                        ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                        : "bg-purple-500/10 text-purple-500 border border-purple-500/20"
                    }
                  `}
                >
                  {item.type === "article" ? "Article" : "Book"}
                </span>
              </div>
              <div className="flex items-center text-sm text-zinc-500">
                <User className="w-4 h-4 mr-2" />
                {item.authors.join(", ")}
              </div>
              <div className="flex flex-wrap gap-2">
                {item.company && (
                  <span
                    className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${selectedTags.includes(item.company) ? "bg-green-600 text-white" : "bg-green-900/30 text-green-400"}
                    `}
                  >
                    {item.company}
                  </span>
                )}
                {item.tags.map((tag) => (
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
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

