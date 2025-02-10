"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { X, Tag, ChevronDown, ChevronUp } from "lucide-react"

type ProjectCategory = "All" | "Development" | "Security"

interface Project {
  title: string
  description: string
  keyAspects: string[]
  category: "Development" | "Security"
  technologies: string[]
  isWIP?: boolean
  extendedDescription?: string
}

const projects: Project[] = [
  {
    title: "Personal Portfolio Website",
    description:
      "Designed and developed a modern, responsive personal portfolio website to showcase projects, skills, and professional experience. The website features a clean, minimalist design with smooth navigation and interactive elements.",
    keyAspects: [
      "Responsive design for all device sizes",
      "Interactive project showcase",
      "Dynamic content rendering",
      "Optimized performance and accessibility",
    ],
    category: "Development",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Heph4estus",
    description:
      "Developing an open source CLI-tool that automates useful infrastructure for penetration testers, bug bounty hunters, and engineers involved in red team operations. By using Terraform the tool is able to automatically instantiate infrastructure with any cloud provider. The infrastructure design is centered around the tools, for example using EC2 instances with powerful GPUs to crack hashes more efficiently with hashcat.",
    keyAspects: [
      "Automated red-teaming infrastructure",
      "Cloud-agnostic deployment",
      "Instantiates various security tools",
      "Optimized for different tasks and providers",
    ],
    category: "Security",
    technologies: ["Go", "Terraform", "Bash", "AWS", "GCP", "DigitalOcean", "Azure"],
    isWIP: true,
  },
  {
    title: "CTF Activity",
    description:
      "Lead red team operations in support of several red vs blue exercises and CTF events. Utilized various scanning and enumeration methods & tools to emulate real-life scenarios. Developed custom scripts to facilitate exploitation of in-scope services.",
    keyAspects: [
      "Led red team operations",
      "Utilized scanning and enumeration tools",
      "Developed custom exploitation scripts",
      "Emulated real-life scenarios",
    ],
    category: "Security",
    technologies: [
      "nmap",
      "tcpdump",
      "Wireshark",
      "Bash",
      "Python",
      "OpenSSH",
      "SQL Injections",
      "Kali Linux",
      "JohnTheRipper",
      "Multi-threading",
    ],
    extendedDescription: `During my time at USC, I participated in two significant CTF activities, showcasing my skills in both offensive and defensive cybersecurity:

1. Red Team Captain:
   In my first CTF, I led the Red Team in an exercise where teams were split into blue and red. The Blue Team was tasked with creating a basic bank website for account creation and money transfers, while the Red Team's objective was to hack other teams' banks.

   Key Contributions:
   - Educated team members on SQL injections and payload writing.
   - Conducted network reconnaissance and vulnerability identification.
   - Discovered an open SSH port and leveraged it for further exploitation.
   - Developed custom scripts using nmap and tcpdump to analyze network traffic.
   - Identified a critical vulnerability: unencrypted data transmission of account credentials.
   - Created a sophisticated exploit using Bash and Python scripts to:
     * Continuously monitor HTTP requests
     * Convert pcap results to CSV files
     * Automatically access newly created accounts
     * Transfer money to our team's account using shell instances automatically created by the Python Script

2. Red and Blue Team Member:
   In the second CTF, I played dual roles in both the Red and Blue teams. Our main task was to create and implement hashing protocols to secure password information, which would then be shared with other groups for cracking attempts.

   Key Contributions:
   - Assisted in creating and applying a custom hashing protocol for password security.
   - Led the development of scripts for password cracking tools, including JohnTheRipper.
   - Implemented and executed Dictionary Attacks on other teams' encrypted passwords.

These experiences significantly enhanced my practical skills in cybersecurity, covering both offensive and defensive strategies, and improved my ability to work under pressure in competitive environments.`,
  },
  {
    title: "Pentesting Simulation",
    description:
      "Participated in an Ethical Hacking class project where we were tasked with penetration testing four HackTheBox boxes. This project involved planning, execution, and reporting of ethical hacking techniques on both Linux and Windows systems.",
    keyAspects: [
      "Developed and delivered a comprehensive pentesting plan",
      "Conducted port scanning and vulnerability assessment",
      "Executed exploits and payloads using Metasploit",
      "Performed privilege escalation on compromised systems",
      "Worked with both Linux and Windows operating systems",
    ],
    category: "Security",
    technologies: [
      "Metasploit",
      "Windows Exploitation",
      "Linux Exploitation",
      "Privilege Escalation",
      "nmap",
      "Meterpreter",
      "Python",
    ],
    extendedDescription: `As part of my Ethical Hacking class, I participated in a comprehensive Pentesting Simulation project:

1. Project Setup:
   - We were divided into groups of two for this exercise.
   - Our task was to attempt to hack into four different HackTheBox boxes.
   - Before beginning the actual pentesting, we had to create and submit a detailed plan outlining our intended tools, technologies, and overall strategies.
   - Only after our plan was approved could we commence with the pentesting activities.

2. Pentesting Process:
   - For most boxes, we initiated our approach by using nmap to scan for open ports.
   - We discovered that the majority of the boxes had at least one vulnerable port that could be exploited.
   - We primarily utilized Metasploit to run exploits and payloads against these vulnerabilities.
   - Upon gaining access to the machines, our next objective was to achieve privilege escalation.
   - The target boxes were a mix of both Linux and Windows operating systems, requiring us to adapt our techniques accordingly.

3. Skills and Technologies Used:
   - Metasploit: Used as our primary framework for executing exploits and payloads.
   - Windows and Linux Exploitation: Developed and applied techniques specific to each operating system.
   - Privilege Escalation: Implemented various methods to elevate our access rights on compromised systems.
   - nmap: Utilized for initial reconnaissance and port scanning.
   - Meterpreter: Employed for post-exploitation activities.
   - Python: Used for creating custom scripts to aid in our pentesting efforts.

This project provided hands-on experience in real-world ethical hacking scenarios, enhancing our practical skills in cybersecurity and penetration testing.`,
  },
  {
    title: "The Movie Database",
    description:
      "Led the back-end development of a movie database website (similar to TMDB) leveraging an API that included endpoints related to searches, synopsis, reviews, and general information about movies. Implemented the backend framework using Spring Boot and Java.",
    keyAspects: [
      "Led back-end development",
      "Implemented API endpoints",
      "Integrated with TMDB API",
      "Developed REST API",
    ],
    category: "Development",
    technologies: ["Java", "MySQL", "Postmate", "Spring Boot", "React", "HTML/CSS", "Docker"],
  },
  {
    title: "Automated CRUD AWS",
    description:
      "Developed a website that automates the creation of customizable CRUDs using Node.js, React, and a combination of AWS services. Responsible for leading back-end development. Designed the AWS Structure that automates and takes in the CRUD Design from users.",
    keyAspects: [
      "Led back-end development",
      "Automated CRUD creation",
      "Designed AWS infrastructure",
      "Integrated multiple AWS services",
    ],
    category: "Development",
    technologies: ["Lambda", "S3", "DynamoDB", "Node.js", "IAM", "Serverless", "React"],
    extendedDescription: `This project was a collaborative effort to create a website for researchers that automates the creation of customizable CRUDs (Create, Read, Update, Delete operations). My primary role was to design and implement the AWS infrastructure that powers this automation.

Key aspects of the AWS structure:

1. User Input Handling:
   - Designed a system to accept and process CRUD designs from users.
   - Utilized AWS Lambda functions to handle incoming data efficiently.

2. Data Flow:
   - Initially used DynamoDB for data ingestion due to its low-latency performance.
   - Implemented a data transfer mechanism from DynamoDB to Amazon S3 for improved storage of large datasets.

3. Storage Solution:
   - Chose Amazon S3 as the primary storage solution due to its scalability and cost-effectiveness for storing large amounts of data.

4. CRUD Instantiation:
   - Leveraged the Serverless framework to automatically instantiate the CRUD operations based on user designs.
   - This approach allowed for efficient, scalable, and easily maintainable serverless architectures.

5. Integration:
   - Ensured seamless integration between different AWS services (Lambda, DynamoDB, S3) and the Serverless framework.
   - Implemented necessary IAM roles and policies to maintain secure communication between services.

This project provided valuable experience in designing scalable, serverless architectures on AWS, and in creating systems that automate complex processes for end-users. It demonstrated the power of cloud services in simplifying database operations for researchers who may not have extensive technical backgrounds.`,
  },
  {
    title: "NFL Wordle",
    description:
      "Led the front-end development of a Wordle-inspired website centered around guessing NFL Players, featuring multiplayer options to play against other users.",
    keyAspects: [
      "Implemented and designed most of the front-end using Bootstrap, CSS, JavaScript, HTML, and Figma",
      "Focused on user experience through thoughtful design",
      "Collaborated with backend team on API data parsing and MySQL database architecture",
      "Developed multiplayer functionality for user engagement",
    ],
    category: "Development",
    technologies: ["HTML/CSS", "Bootstrap", "JavaScript", "Figma", "MySQL"],
  },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTagFilter, setShowTagFilter] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((project) => {
      project.technologies.forEach((tech) => tags.add(tech))
    })
    return Array.from(tags).sort()
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter(
      (project) =>
        (selectedCategory === "All" || project.category === selectedCategory) &&
        (selectedTags.length === 0 || selectedTags.every((tag) => project.technologies.includes(tag))),
    )
  }, [selectedCategory, selectedTags])

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.isWIP && !b.isWIP) return -1
      if (!a.isWIP && b.isWIP) return 1
      return 0
    })
  }, [filteredProjects])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const toggleProjectExpansion = (projectTitle: string) => {
    setExpandedProject((prev) => (prev === projectTitle ? null : projectTitle))
  }

  return (
    <main className="bg-black min-h-screen pt-24 pb-16">
      <div className="px-4 max-w-[1400px] mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-center">Projects</h1>

        <p className="text-zinc-400 text-sm mb-8 text-center">
          I apologize that I don't have code repositories for many of these projects, as most were completed during my
          time in college. However, I assure you that all projects after "Personal Portfolio Website" and "Heph4estus"
          will have associated repositories.
        </p>

        <div className="flex flex-col items-center mb-12 space-y-6">
          <div className="flex items-center gap-4">
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
            <div className="inline-flex force-rounded border border-zinc-800 p-1">
              {(["All", "Development", "Security"] as ProjectCategory[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 text-sm force-rounded transition-colors
                    ${selectedCategory === category ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {showTagFilter && (
            <>
              <div className="flex flex-wrap justify-center gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1 text-xs force-rounded transition-colors
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
                  className="text-sm text-zinc-400 hover:text-white flex items-center force-rounded"
                >
                  Clear filters <X className="w-4 h-4 ml-1" />
                </button>
              )}
            </>
          )}
        </div>

        <div className="space-y-6">
          {sortedProjects.map((project) => (
            <div key={project.title} className="border border-zinc-800 force-rounded p-6 space-y-4 relative">
              {project.isWIP && (
                <span className="absolute top-2 right-2 bg-zinc-800 text-blue-400 text-xs font-medium px-2 py-1 force-rounded border border-blue-500">
                  WIP
                </span>
              )}
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
              <div>
                <h3 className="text-sm font-medium mb-2">Key Aspects:</h3>
                <ul className="list-none space-y-1">
                  {project.keyAspects.map((aspect, index) => (
                    <li key={index} className="text-zinc-400 text-sm pl-4 relative">
                      <span className="absolute left-0">-</span>
                      {aspect}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`
                      px-3 py-1 forced-rounded text-xs
                      ${selectedTags.includes(tech) ? "bg-blue-600 text-white" : "bg-zinc-900 text-zinc-400"}
                    `}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.extendedDescription && (
                <div>
                  <Button
                    onClick={() => toggleProjectExpansion(project.title)}
                    variant="outline"
                    size="sm"
                    className="mt-2 text-blue-400 hover:text-blue-300 force-rounded"
                  >
                    {expandedProject === project.title ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Read Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Read More
                      </>
                    )}
                  </Button>
                  {expandedProject === project.title && (
                    <div className="mt-4 text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap force-rounded">
                      {project.extendedDescription}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

