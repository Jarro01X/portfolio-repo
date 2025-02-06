interface Contribution {
  project: string
  description: string
  contributions: string[]
  technologies: string[]
  link: string
}

const contributions: Contribution[] = [
  {
    project: "React",
    description: "A JavaScript library for building user interfaces",
    contributions: [
      "Implemented a new feature for handling async rendering",
      "Fixed a bug in the reconciliation algorithm",
      "Improved documentation for hooks",
    ],
    technologies: ["JavaScript", "TypeScript", "React"],
    link: "https://github.com/facebook/react",
  },
  {
    project: "TensorFlow",
    description: "An open-source machine learning framework",
    contributions: [
      "Optimized performance for GPU computations",
      "Added support for a new neural network layer type",
      "Contributed to the TensorFlow.js project",
    ],
    technologies: ["Python", "C++", "CUDA", "JavaScript"],
    link: "https://github.com/tensorflow/tensorflow",
  },
  {
    project: "VS Code",
    description: "A code editor redefined and optimized for building and debugging modern web and cloud applications",
    contributions: [
      "Developed a new extension for improved TypeScript support",
      "Fixed accessibility issues in the UI",
      "Contributed to the Python language server",
    ],
    technologies: ["TypeScript", "JavaScript", "Python"],
    link: "https://github.com/microsoft/vscode",
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
              <div>
                <p className="text-sm mb-2">Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {contribution.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

