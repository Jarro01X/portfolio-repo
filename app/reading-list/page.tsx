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
  currentlyReading?: boolean
}

const readingItems: ReadingItem[] = [
  {
    id: "microsoft-jailbreak-cca",
    title: "Jailbreaking is Mostly Simpler Than You Think",
    url: "https://msrc.microsoft.com/blog/2025/03/jailbreaking-is-mostly-simpler-than-you-think/",
    authors: ["Microsoft Security Research Center", "Mark Russinovich"],
    tags: ["Threat Research", "LLM", "Jailbreak", "Generative AI", "Security"],
    type: "article",
    company: "Microsoft",
  },
  {
    id: "unit42-pan-llm-jailbreak",
    title: "Investigating LLM Jailbreaking of Popular Generative AI Web Products",
    url: "https://unit42.paloaltonetworks.com/jailbreaking-generative-ai-web-products/",
    authors: ["Yongzhe Huang", "Yang Ji", "Wenjun Hu"],
    tags: ["Threat Research", "LLM", "Jailbreak", "Generative AI", "Security"],
    type: "article",
    company: "Palo Alto Networks",
  },
  {
    id: "google-ai-protection",
    title: "Announcing AI Protection: Security for the AI era",
    url: "https://cloud.google.com/blog/products/identity-security/introducing-ai-protection-security-for-the-ai-era",
    authors: ["Archana Ramamoorthy"],
    tags: ["Security", "Google Cloud", "AI Protection", "LLM"],
    type: "article",
    company: "Google",
  },
  {
    id: "microsoft-pyrit-multi-turn",
    title: "PyRIT: Multi-Turn orchestrators",
    url: "https://azure.github.io/PyRIT/blog/2024_12_3.html",
    authors: ["Jose Selvi"],
    tags: ["Orchestrators", "AI", "Red Team", "Security"],
    type: "article",
    company: "Microsoft",
  },
  {
    id: "figma-server-side-sandboxing-containers-seccomp",
    title: "Server-side sandboxing: Containers and seccomp",
    url: "https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/",
    authors: ["Hongyi Hu", "Max Serrano"],
    tags: ["Sandboxing", "Security", "Containers", "Seccomp"],
    type: "article",
    company: "Figma",
  },
  {
    id: "figma-server-side-sandboxing-vm",
    title: "Server-side sandboxing: virtual machines",
    url: "https://www.figma.com/blog/server-side-sandboxing-virtual-machines/",
    authors: ["Hongyi Hu", "Max Serrano"],
    tags: ["Sandboxing", "Security", "Virtual Machines"],
    type: "article",
    company: "Figma",
  },
  {
    id: "figma-server-side-sandboxing",
    title: "Server-side sandboxing: an introduction",
    url: "https://www.figma.com/blog/server-side-sandboxing-an-introduction/",
    authors: ["Hongyi Hu", "Max Serrano"],
    tags: ["Sandboxing", "Security", "Virtualization"],
    type: "article",
    company: "Figma",
  },
  {
    id: "figma-device-trust",
    title: "Enforcing device trust on code changes",
    url: "https://www.figma.com/blog/how-we-enforce-device-trust-on-code-changes/",
    authors: ["Griffin Choe"],
    tags: ["Security", "Trust", "Okta", "Certificates", "Signatures"],
    type: "article",
    company: "Figma",
  },
  {
    id: "tailscale-infra-team-stays-small",
    title: "How Tailscale’s infra team stays small",
    url: "https://tailscale.com/blog/infra-team-stays-small",
    authors: ["Kylie Fisher"],
    tags: ["Infrastructure", "Team Efficiency", "AWS", "Digital Ocean"],
    type: "article",
    company: "Tailscale",
  },
  {
    id: "tailscale-s3-log-streaming",
    title: "Tailscale log streaming now supports S3 destinations",
    url: "https://tailscale.com/blog/s3-log-streaming",
    authors: ["Pouyan Aminian", "Parler Higgins"],
    tags: ["Infrastructure", "Cloud", "Logging", "AWS"],
    type: "article",
    company: "Tailscale",
  },
  {
    id: "vercel-framework-infrastructure",
    title: "Framework-defined infrastructure",
    url: "https://vercel.com/blog/framework-defined-infrastructure",
    authors: ["Malte Ubl"],
    tags: ["Infrastructure", "Infrastructure as Code", "Scalability", "Cloud"],
    type: "article",
    company: "Vercel",
  },
  {
    id: "vercel-bts-infrastructure",
    title: "Behind the scenes of Vercel's infrastructure: Achieving optimal scalability and performance",
    url: "https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure",
    authors: ["Lydia Hallie"],
    tags: ["Infrastructure", "Performance", "Scalability", "Cloud"],
    type: "article",
    company: "Vercel",
  },
  {
    id: "google-ddos-protection",
    title: "How to protect your site from DDoS attacks with Cloud Networking",
    url: "https://cloud.google.com/blog/products/identity-security/how-to-protect-your-site-from-ddos-attacks-with-cloud-networking",
    authors: ["Marc Howard", "Max Saltonstall"],
    tags: ["Security", "Google Cloud", "DDoS", "Networking"],
    type: "article",
    company: "Google",
  },
  {
    id: "google-quantum-safe-digital-signatures",
    title: "Announcing quantum-safe digital signatures in Cloud KMS",
    url: "https://cloud.google.com/blog/products/identity-security/announcing-quantum-safe-digital-signatures-in-cloud-kms",
    authors: ["Jennifer Fernick","Andrew Foster"],
    tags: ["Security", "Google Cloud", "Quantum", "Digital Signatures"],
    type: "article",
    company: "Google",
  },
  {
    id: "google-credential-theft-risk",
    title: "5 ways Google Cloud can help you minimize credential theft risk",
    url: "https://cloud.google.com/blog/products/identity-security/5-ways-google-cloud-can-help-you-minimize-credential-theft-risk/?linkId=12923183",
    authors: ["Pano Mavrommatis", "Vikram Makhija"],
    tags: ["Security", "Google Cloud", "Credential Theft", "Risk Mitigation"],
    type: "article",
    company: "Google",
  },
  {
    id: "malware-data-science",
    title: "Malware Data Science: Attack Detection and Attribution",
    url: "https://nostarch.com/malwaredatascience",
    authors: ["Joshua Saxe", "Hillary Sanders"],
    tags: ["Malware Analysis", "Detection", "Data Science", "Machine Learning"],
    type: "book",
    currentlyReading: true,
  },
  {
    id: "google-how-they-threat-intelligence",
    title: "How Google Does It: Using threat intelligence to uncover and track cybercrime",
    url: "https://cloud.google.com/transform/how-google-does-it-threat-intelligence-uncover-track-cybercrime",
    authors: ["Kiberly Goody", "Seth Rosenblatt"],
    tags: ["Threat Intelligence", "Cybercrime", "TTP"],
    type: "article",
    company: "Google",
  },
  {
    id: "formal-ssh-ssm-open-source",
    title: "Down the rabbit hole: Implementing SSH port forwarding over AWS Session Manager",
    url: "https://www.joinformal.com/blog/down-the-rabbit-hole-implementing-ssh-port-forwarding-over-aws-session-manager/",
    authors: ["Aditya Saligrama"],
    tags: ["Reverse Proxy", "Networking", "SSH", "AWS"],
    type: "article",
    company: "Formal",
  },
  {
    id: "formal-reverse-proxy-mongodb-protocol-aware",
    title: "Building a Protocol-Aware Reverse Proxy: Lessons from Handling MongoDB's Unique Framing",
    url: "https://www.joinformal.com/blog/building-a-protocol-aware-reverse-proxy-lessons-from-handling-mongodbs-unique-framing/",
    authors: ["Victor Vieux"],
    tags: ["Reverse Proxy", "Networking", "MongoDB"],
    type: "article",
    company: "Formal",
  },
  {
    id: "crowdstrike-malware-similarity-detection-databank",
    title: "EMBERSim: A Large-Scale Databank for Boosting Similarity Search in Malware Analysis",
    url: "https://www.crowdstrike.com/en-us/blog/embersim-large-databank-for-similarity-research-in-cybersecurity/",
    authors: ["Dragoș Corlătescu", "Alexandru Dinu", "Mihaela Găman", "Paul Sumedrea"],
    tags: ["Machine Learning", "Datasets", "Malware Detection"],
    type: "article",
    company: "Crowdstrike",
  },
  {
    id: "cloudflare-automated-platform-resilience",
    title: "Improving platform resilience at Cloudflare through automation",
    url: "https://blog.cloudflare.com/improving-platform-resilience-at-cloudflare/",
    authors: ["Opeyemi Onikute"],
    tags: ["Infrastructure", "Automation", "SRE", "Resilience"],
    type: "article",
    company: "Cloudflare",
  },
  {
    id: "google-adversarial-misuse-AI",
    title: "Adversarial Misuse of Generative AI",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/adversarial-misuse-generative-ai",
    authors: ["Google Threat Intelligence Group"],
    tags: ["Security", "Threat Intelligence", "AI Abuse"],
    type: "article",
    company: "Google",
  },
  {
    id: "google-software-abuse",
    title: "CVE-2023-6080: A Case Study on Third-Party Installer Abuse",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/cve-2023-6080-third-party-installer-abuse",
    authors: ["Mandiant"],
    tags: ["Security", "Threat Intelligence", "Software Abuse"],
    type: "article",
    company: "Google",
  },
  {
    id: "google-cybercrime-national-threat",
    title: "Cybercrime: A Multifaceted National Security Threat",
    url: "https://cloud.google.com/blog/topics/threat-intelligence/cybercrime-multifaceted-national-security-threat",
    authors: ["Google Threat Intelligence Group"],
    tags: ["Security", "Threat Intelligence", "Cybercrime"],
    type: "article",
    company: "Google",
  },
  {
    id: "microsoft-redteam-ai-100-products",
    title: "3 takeaways from red teaming 100 generative AI products",
    url: "https://www.microsoft.com/en-us/security/blog/2025/01/13/3-takeaways-from-red-teaming-100-generative-ai-products/",
    authors: ["Blake Bullwinkel", "Ram Shankar Siva Kumar"],
    tags: ["Security", "AI", "Red Team"],
    type: "article",
    company: "Microsoft",
  },
  {
    id: "crowdstrike-latam-malware",
    title: "A Look Back: The Evolution of Latin American eCrime Malware in 2024",
    url: "https://www.crowdstrike.com/en-us/blog/latam-ecrime-malware-evolution-2024/",
    authors: ["Kevin Ratto"],
    tags: ["Security", "Threat Research", "Malware"],
    type: "article",
    company: "Crowdstrike",
  },
  {
    id: "crowdstrike-hunting-cloud-threats",
    title: "How CrowdStrike Hunts, Identifies and Defeats Cloud-Focused Threats",
    url: "https://www.crowdstrike.com/en-us/blog/how-crowdstrike-hunts-identifies-and-defeats-cloud-threats/",
    authors: ["Counter Adversary Operations"],
    tags: ["Security", "Threat Research", "Malware", "Cloud"],
    type: "article",
    company: "Crowdstrike",
  },
  {
    id: "cloudflare-incident-2025",
    title: "Cloudflare Incident on February 6, 2025",
    url: "https://blog.cloudflare.com/cloudflare-incident-on-february-6-2025/",
    authors: ["Cloudflare"],
    tags: ["Incident Report", "Infrastructure", "Security"],
    type: "article",
    company: "Cloudflare",
  },
  {
    id: "cloudflare-data-analysis",
    title: "How We Make Sense of Too Much Data",
    url: "https://blog.cloudflare.com/how-we-make-sense-of-too-much-data/",
    authors: ["Cloudflare"],
    tags: ["Data Analysis", "Big Data", "Infrastructure"],
    type: "article",
    company: "Cloudflare",
  },
  {
    id: "netflix-distributed-counter",
    title: "Netflix's Distributed Counter Abstraction",
    url: "https://netflixtechblog.com/netflixs-distributed-counter-abstraction-8d0c45eb66b2",
    authors: ["Netflix Technology Blog"],
    tags: ["Distributed Systems", "Counters", "Scalability"],
    type: "article",
    company: "Netflix",
  },
  {
    id: "netflix-timeseries-data",
    title: "Introducing Netflix TimeSeries Data Abstraction Layer",
    url: "https://netflixtechblog.com/introducing-netflix-timeseries-data-abstraction-layer-31552f6326f8",
    authors: ["Netflix Technology Blog"],
    tags: ["Time Series", "Data Abstraction", "Infrastructure"],
    type: "article",
    company: "Netflix",
  },
  {
    id: "netflix-noisy-neighbor-ebpf",
    title: "Noisy Neighbor Detection with eBPF",
    url: "https://netflixtechblog.com/noisy-neighbor-detection-with-ebpf-64b1f4b3bbdd",
    authors: ["Netflix Technology Blog"],
    tags: ["eBPF", "Performance", "Monitoring"],
    type: "article",
    company: "Netflix",
  },
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
    authors: ["Corey Ball"],
    tags: ["Security", "APIs", "Penetration Testing", "Web Security"],
    type: "book",
  },
  {
    id: "clean-code",
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    authors: ["Robert C. Martin"],
    tags: ["Clean Code", "Best Practices", "Software Engineering", "Agile"],
    type: "book",
  },
  {
    id: "black-hat-python",
    title: "Black Hat Python, 2nd Edition",
    url: "https://nostarch.com/black-hat-python2E",
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
    authors: ["Mark Richards", "Neal Ford"],
    tags: ["Architecture", "Software Design", "System Design", "Best Practices"],
    type: "book",
  },
  {
    id: "designing-data-intensive-applications",
    title: "Designing Data-Intensive Applications",
    url: "https://dataintensive.net/",
    authors: ["Martin Kleppmann"],
    tags: ["Distributed Systems", "Data Engineering", "System Design", "Architecture"],
    type: "book",
  },
  {
    id: "web-application-hackers-handbook",
    title: "The Web Application Hacker's Handbook",
    url: "https://www.amazon.com/Web-Application-Hackers-Handbook-Exploiting/dp/1118026470",
    authors: ["Dafydd Stuttard", "Marcus Pinto"],
    tags: ["Security", "Web Security", "Penetration Testing", "Hacking"],
    type: "book",
  },
  {
    id: "designing-secure-software",
    title: "Designing Secure Software",
    url: "https://nostarch.com/designing-secure-software",
    authors: ["Loren Kohnfelder"],
    tags: ["Security", "Software Design", "Best Practices", "Architecture"],
    type: "book",
  },
  {
    id: "cli-guidelines",
    title: "Command Line Interface Guidelines",
    url: "https://clig.dev/",
    authors: ["Aanand Prasad", "Ben Firshman", "Carl Tashian", "Eva Parish"],
    tags: ["CLI", "UX", "Design", "Development"],
    type: "article",
  },
  {
    id: "ux-patterns-cli",
    title: "UX Patterns for CLI Tools",
    url: "https://lucasfcosta.com/2022/06/01/ux-patterns-cli-tools.html",
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

  const sortedFilteredItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      if (a.currentlyReading && !b.currentlyReading) return -1
      if (!a.currentlyReading && b.currentlyReading) return 1
      return 0
    })
  }, [filteredItems])
  
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
              variant="outline"
              size="sm"
              className={`h-9 px-3 force-rounded border-zinc-700 bg-transparent ${
                selectedType === "all"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
              }`}
            >
              All
            </Button>
            <Button
              onClick={() => {
                setSelectedType("article")
                setSelectedTags([])
              }}
              variant="outline"
              size="sm"
              className={`h-9 px-3 force-rounded border-zinc-700 bg-transparent ${
                selectedType === "article"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
              }`}
            >
              <Newspaper className="w-4 h-4 mr-2" />
              Articles
            </Button>
            <Button
              onClick={() => {
                setSelectedType("book")
                setSelectedTags([])
              }}
              variant="outline"
              size="sm"
              className={`h-9 px-3 force-rounded border-zinc-700 bg-transparent ${
                selectedType === "book"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600"
              }`}
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
        {sortedFilteredItems.map((item) => (
            <article key={item.id} className="border border-zinc-800 force-rounded p-6 space-y-4">
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
                <div className="flex items-center space-x-2">
                  {item.currentlyReading && (
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20">
                      Reading
                    </span>
                  )}
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

