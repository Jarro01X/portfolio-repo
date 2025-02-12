import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface Contribution {
  project: string
  description: string
  contributions: string[]
  technologies: string[]
  link: string
}

const contributions: Contribution[] = [
  {
    project: "Nuclei",
    description: "Fast and customizable vulnerability scanner based on simple YAML-based DSL.",
    contributions: ["Translated README to Portuguese (Brazil)", "Improved documentation for international users"],
    technologies: ["Go", "YAML", "Security"],
    link: "https://github.com/projectdiscovery/nuclei",
  },
]

export function OpenSourceContributions() {
  return (
    <section className="py-16">
      <div className="px-4 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold mb-12">Open Source Contributions</h2>
        <div className="space-y-8">
          {contributions.map((contribution, index) => (
            <div key={index} className="relative pl-8 border-l-[3px] border-[#4B67F5]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    <a
                      href={contribution.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition-colors"
                    >
                      {contribution.project}
                    </a>
                  </h3>
                  <p className="text-zinc-400 text-sm mb-4">{contribution.description}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm mb-2">Contributions:</p>
                <ul className="space-y-2">
                  {contribution.contributions.map((item, i) => (
                    <li key={i} className="text-zinc-400 text-sm pl-4 relative">
                      <span className="absolute left-0">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <p className="text-sm mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {contribution.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {contribution.project === "Nuclei" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 force-rounded"
                  onClick={() =>
                    window.open("https://github.com/projectdiscovery/nuclei/blob/dev/README_PT-BR.md", "_blank")
                  }
                >
                  View Portuguese README
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}