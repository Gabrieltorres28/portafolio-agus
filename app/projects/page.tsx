"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Dashboard",
    description:
      "Full-stack application with machine learning integration for real-time data analysis and predictive modeling.",
    tech: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "Scalable microservices architecture with advanced payment processing and inventory management.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Docker"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "WebSocket-based chat platform with AI moderation and multi-language support.",
    tech: ["Vue.js", "Socket.io", "Redis", "OpenAI API", "AWS"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 4,
    title: "Blockchain Voting System",
    description: "Decentralized voting platform ensuring transparency and security through smart contracts.",
    tech: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    image: "/placeholder.svg?height=300&width=500",
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my work spanning web development, AI integration, and innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
