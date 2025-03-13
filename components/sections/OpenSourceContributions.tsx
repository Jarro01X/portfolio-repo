import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface AdditionalLink {
  text: string
  url: string
}

interface Contribution {
  project: string
  description: string
  contributions: string[]
  technologies: string[]
  link: string
  additionalLinks?: AdditionalLink[]
}

const contributions: Contribution[] = [
  {
    project: "Nuclei",
    description: "Fast and customizable vulnerability scanner based on simple YAML-based DSL.",
    contributions: ["Translated README to Portuguese (Brazil)", "Improved documentation for international users"],
    technologies: ["Go", "YAML", "Security"],
    link: "https://github.com/projectdiscovery/nuclei",
    additionalLinks: [
      {
        text: "View Portuguese README",
        url: "https://github.com/projectdiscovery/nuclei/blob/dev/README_PT-BR.md",
      },
    ],
  },
  {
    project: "PyRIT",
    description: "Microsoft's Python Risk Identification Tool for generative AI security.",
    contributions: [
      "Implemented feature to add Babelscape/ALERT adversarial Dataset",
      "Collaborated on issue #449 and submitted pull request #738",
    ],
    technologies: ["Python", "AI", "Security", "Data Processing"],
    link: "https://github.com/Azure/PyRIT",
    additionalLinks: [
      {
        text: "View Pull-Request #738",
        url: "https://github.com/Azure/PyRIT/pull/738",
      },
    ],
  },
  {
    project: "Tracecat",
    description: "The open source Times / Splunk SOAR alternative for security and IT engineers. Built on simple YAML templates for integrations and response-as-code",
    contributions: [
      "Implemented the ability to edit secrets in the Secrets Manager, both at an Organization and Workspace level",
      "Implemented feature to add JSONB files to lookup tables",
    ],
    technologies: ["Python", "React", "TypeScript", "Security"],
    link: "https://github.com/TracecatHQ/tracecat",
    additionalLinks: [
      {
        text: "View Secret Manager PR",
        url: "https://github.com/TracecatHQ/tracecat/pull/935",
      },
      {
        text: "View JSONB Files PR",
        url: "https://github.com/TracecatHQ/tracecat/pull/937",
      },
    ],
  },
]

export function OpenSourceContributions() {
  return (
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
            <p className="text-sm mb-2">Key Contributions:</p>
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
                <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 force-rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-400"
              onClick={() => window.open(contribution.link, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Project
            </Button>

            {contribution.additionalLinks &&
              contribution.additionalLinks.map((link, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className={`text-green-400 border-green-400`}
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {link.text}
                </Button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}