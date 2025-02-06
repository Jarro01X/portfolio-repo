"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Skill {
  name: string
  image: string
}

interface SkillCategory {
  skills: Skill[]
}

interface RoleSkills {
  role: string
  categories: SkillCategory[]
}

const skillsByRole: RoleSkills[] = [
  {
    role: "Programming Languages",
    categories: [
      {
        skills: [
          {
            name: "JavaScript",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          },
          {
            name: "TypeScript",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
          },
          { name: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
          { name: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
          { name: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "C#", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
          { name: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
          { name: "Bash", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
        ],
      },
    ],
  },
  {
    role: "Full-Stack",
    categories: [
      {
        skills: [
          { name: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
          {
            name: "PostgreSQL",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          },
          { name: "MySQL", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
          { name: "Spring", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
        ],
      },
    ],
  },
  {
    role: "Infrastructure",
    categories: [
      {
        skills: [
          {
            name: "AWS",
            image:
              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
          },
          { name: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          {
            name: "Kubernetes",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
          },
          { name: "Linux", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
          {
            name: "Kafka",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
          },
          {
            name: "Terraform",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
          },
          { name: "Ansible", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
        ],
      },
    ],
  },
  {
    role: "Security",
    categories: [
      {
        skills: [
          {
            name: "Wireshark",
            image: "https://www.kali.org/tools/wireshark/images/wireshark-logo.svg",
          },
          { name: "Burp Suite", image: "https://www.kali.org/tools/burpsuite/images/burpsuite-logo.svg" },
          { name: "Nmap", image: "https://nmap.org/images/nmap-logo-256x256.png" },
          { name: "Kali Linux", image: "https://www.kali.org/images/kali-dragon-icon.svg" },
          { name: "Tcpdump", image: "https://www.kali.org/tools/tcpdump/images/tcpdump-logo.svg" },
          {
            name: "Active Directory",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
          },
          {
            name: "Network Pentesting",
            image: "https://cdn.jsdelivr.net/gh/FortAwesome/Font-Awesome/svgs/solid/wifi.svg",
          },
          {
            name: "Linux",
            image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
          },
        ],
      },
    ],
  },
  {
    role: "AI",
    categories: [
      {
        skills: [
          { name: "Embedding", image: "https://img.icons8.com/cotton/64/000000/artificial-intelligence.png" },
          { name: "RAG", image: "https://img.icons8.com/color/48/000000/artificial-intelligence.png" },
        ],
      },
    ],
  },
]

export function Skills() {
  const [selectedRole, setSelectedRole] = useState<string>(skillsByRole[0].role)

  const currentSkills = skillsByRole.find((role) => role.role === selectedRole)!

  return (
    <section id="skills" className="py-16">
      <div className="px-4 max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>

        <div className="flex justify-center gap-3 mb-8">
          {skillsByRole.map((roleSkills) => (
            <Button
              key={roleSkills.role}
              onClick={() => setSelectedRole(roleSkills.role)}
              variant={selectedRole === roleSkills.role ? "default" : "outline"}
              className={`
                h-9 px-5 rounded-md
                ${
                  selectedRole === roleSkills.role
                    ? "bg-[#4B67F5] hover:bg-[#4B67F5]/90"
                    : "border-zinc-800 text-white hover:bg-zinc-800"
                }
              `}
            >
              {roleSkills.role}
            </Button>
          ))}
        </div>

        <div className="flex justify-center">
          {currentSkills.categories.map((category, index) => (
            <div key={`category-${index}`} className="flex justify-center">
              <div
                className={`grid gap-6 justify-items-center ${
                  selectedRole === "AI"
                    ? "grid-cols-1 sm:grid-cols-2 place-content-center"
                    : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                }`}
              >
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={`${skill.name}-${skillIndex}`}
                    className="bg-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center group hover:bg-zinc-700 transition-all w-24 h-24 shadow-md hover:shadow-lg"
                  >
                    <div className="w-12 h-12 mb-3 relative">
                      <Image
                        src={skill.image || "/placeholder.svg"}
                        alt={`${skill.name} logo`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="text-zinc-300 text-xs text-center group-hover:text-white transition-colors font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

