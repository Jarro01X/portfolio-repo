"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, Tag, X } from "lucide-react"

interface OpenSourceProject {
  name: string
  description: string
  link: string
  tags: string[]
}

const projects: OpenSourceProject[] = [
  {
    name: "Tracecat",
    description:
      "The open source Times / Splunk SOAR alternative for security and IT engineers. Built on simple YAML templates for integrations and response-as-code.",
    link: "https://github.com/TracecatHQ/tracecat",
    tags: ["Security", "Automation", "Python", "Orchestration"],
  },
  {
    name: "Hatchet",
    description: "A distributed, fault-tolerant task orchestrator for the modern data stack",
    link: "https://github.com/hatchet-dev/hatchet",
    tags: ["Go", "Task Orchestration", "Distributed Systems"],
  },
  {
    name: "Continue",
    description:
      "⏩ The open-source autopilot for software development—a VS Code extension that brings the power of ChatGPT to your IDE",
    link: "https://github.com/continuedev/continue",
    tags: ["AI", "Developer Tools", "VS Code", "TypeScript"],
  },
  {
    name: "Onyx",
    description: "Onyx is a powerful web3 wallet built for DeFi traders",
    link: "https://github.com/onyx-dot-app/onyx",
    tags: ["Web3", "DeFi", "Blockchain", "TypeScript"],
  },
  {
    name: "Infisical",
    description:
      "♾ Infisical is an open-source secret management platform that enables teams to centralize and manage their secrets (API keys, database credentials, etc)",
    link: "https://github.com/Infisical/infisical",
    tags: ["Security", "DevOps", "TypeScript", "Secret Management"],
  },
  {
    name: "Unsloth",
    description: "5X faster LLM fine-tuning ⚡ 60% less memory usage 👾 Drop-in replacement for HuggingFace Trainers",
    link: "https://github.com/unslothai/unsloth",
    tags: ["AI", "Machine Learning", "Python", "Performance"],
  },
  {
    name: "TrustGraph",
    description: "Open-source AI agent security and monitoring",
    link: "https://github.com/trustgraph-ai/trustgraph",
    tags: ["AI", "Security", "Monitoring", "Python"],
  },
  {
    name: "E2B",
    description: "Open-source platform for AI-first applications. Run and deploy AI agents in a secure sandbox",
    link: "https://github.com/e2b-dev/E2B",
    tags: ["AI", "Cloud Infrastructure", "TypeScript", "Sandbox"],
  },
  {
    name: "PyRIT",
    description: "The Python Risk Identification Tool for generative AI security",
    link: "https://github.com/Azure/PyRIT",
    tags: ["Security", "AI", "Python", "Risk Assessment"],
  },
  {
    name: "Gubble",
    description: "A tool designed to audit Google Workspace group settings",
    link: "https://github.com/LowOrbitSecurity/gubble",
    tags: ["Security", "AWS", "Python", "Threat Hunting"],
  },
  {
    name: "Kubenomicon",
    description: "The Kubernetes cluster configuration and management handbook",
    link: "https://github.com/kubenomicon/kubenomicon",
    tags: ["Kubernetes", "DevOps", "Infrastructure", "Documentation"],
  },
  {
    name: "Nuclei",
    description: "Fast and customizable vulnerability scanner based on simple YAML-based DSL",
    link: "https://github.com/projectdiscovery/nuclei",
    tags: ["Security", "Vulnerability Scanner", "Go", "YAML"],
  },
  {
    name: "Ansible",
    description: "Ansible is a radically simple IT automation platform",
    link: "https://github.com/ansible/ansible",
    tags: ["DevOps", "Automation", "Python", "Infrastructure"],
  },
  {
    name: "Vercel",
    description: "Develop. Preview. Ship.",
    link: "https://github.com/vercel/vercel",
    tags: ["Deployment", "Frontend", "Node.js", "Cloud"],
  },
  {
    name: "Stack",
    description: "The authentication and user management platform for the modern web",
    link: "https://github.com/stack-auth/stack",
    tags: ["Authentication", "Security", "TypeScript", "Web"],
  },
]

export default function OpenSourcePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) => selectedTags.length === 0 || selectedTags.every((tag) => project.tags.includes(tag)),
    )
  }, [selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-4 max-w-[1200px] mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Open Source</h1>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          A curated list of innovative open-source projects I follow and support. I either believe in the people behind
          these projects, or the project itself.
        </p>

        <div className="mb-8 flex flex-col items-center space-y-4">
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

        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.name}
              className="border border-zinc-800 rounded-lg p-6 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors flex items-center"
                    >
                      {project.name}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </h2>
                </div>
                <p className="text-zinc-400 text-sm">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
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
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

