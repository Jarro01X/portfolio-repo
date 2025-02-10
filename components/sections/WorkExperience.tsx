interface Experience {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
  skills: string[]
  techStack: string[]
  location?: string
}

const experiences: Experience[] = [
  {
    title: "Security Software Engineer Intern",
    company: "Stealth",
    period: "September 2024 - Present",
    location: "Mountain View, CA",
    description:
      "Responsible for securing old and new features, patching present security issues, and develop security solutions",
    achievements: [
      "Identified and patched Stored and Reflected XSS, NoSQL Injections, IDORs, and JWT exploitation vulnerabilities",
      "Developed automated SAST and DAST solutions using CodeQL, Nuclei, and GitHub Actions",
      "Created a workflow that integrates security testing into the CI/CD pipeline",
    ],
    skills: ["SAST", "DAST", "Vulnerability Assessment", "CI/CD Integration", "Security Automation"],
    techStack: ["Next.js", "Node.js", "DigitalOcean", "CodeQL", "MongoDB", "JWT", "GitHub Actions", "Nuclei"],
  },
  {
    title: "Software Engineer Intern",
    company: "Amazon Ads (PubTech)",
    period: "May 2023 - August 2023",
    location: "Seattle, WA",
    description:
      "During my internship at Amazon Ads' Data Management Team I was responsible for developing and designing from scratch a Data Monitoring tool for an infrastructure migration. Our system was used to manage and store advertisement data for platforms such as Twitch (more than 240 million unique users)",
    achievements: [
      "Developed a Java-based tool to reconcile data inconsistencies",
      "Utilized EventBridge to trigger AWS Lambda for regular data consistency checks across multiple sources",
      "Implemented automated reporting and alerting system using S3, CloudWatch, and SNS",
      "Wrote comprehensive design documents and managed implementations throughout their lifecycle",
      "Conducted threat modeling and code reviews using frameworks like STRIDE",
    ],
    skills: ["Data Reconciliation", "Infrastructure Migration", "System Design", "Threat Modeling", "Code Review"],
    techStack: [
      "Java",
      "Kafka",
      "TypeScript",
      "AWS S3",
      "AWS CDK",
      "AWS EventBridge",
      "AWS DynamoDB",
      "AWS SNS",
      "AWS IAM",
      "AWS Lambda",
      "AWS CloudWatch",
    ],
  },
]

export function WorkExperience() {
  return (
    <section className="py-16">
      <div className="px-4 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold mb-12">Work Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 border-l-[3px] border-[#4B67F5]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{exp.company}</p>
                  {exp.location && <p className="text-zinc-400 text-sm mb-4">{exp.location}</p>}
                </div>
                <span className="text-sm text-zinc-400">{exp.period}</span>
              </div>
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{exp.description}</p>
              <div className="mb-4">
                <p className="text-sm mb-2">Key Achievements:</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-zinc-400 text-sm pl-4 relative">
                      <span className="absolute left-0">-</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <p className="text-sm mb-2">Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Tech Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech, i) => (
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

