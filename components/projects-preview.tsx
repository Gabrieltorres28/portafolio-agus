"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const featuredProjects = [
  {
    title: "Sistema Municipal Villa Esperanza",
    description: "Sistema de votación ciudadana para la administración pública.",
    image: "/villaesperanza.png",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    demo: "https://v0-simulated-budget-system.vercel.app"
  },
  {
    title: "Sistema Institucional ISIPP",
    description: "Portal educativo para gestión académica y comunicación institucional.",
    image: "/isipp.png",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    demo: "https://isipp.com.ar"
  },
  {
    title: "IA ANALISIS DEL COMPARTAMIENTO DE TUS IA'S",
    description: "Sistema IA que interpreta el uso y potencial de la IA Generativa.",
    image: "/projectia2.png",
    tech: ["Next.js", "OpenAI", "Tailwind CSS"],
    demo: "https://ia-ai-flame.vercel.app"
  },
  
  {
    title: "Landing Empresarial Grúas Torres",
    description: "Sitio institucional para empresa de servicios industriales y rurales.",
    image: "/logoatc.png",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    demo: "https://gruastorres-oficial.vercel.app"
  }
]

export function ProjectsPreview() {
  return (
    <section id="projects-preview" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Trabajando, focusing.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Una muestra de mis proyectos más destacados en producción real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={index}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 group block"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
          >
            <Link href="/CV_Gabriel_Torres_Actualizado.pdf" target="_blank" rel="noopener noreferrer">
              Ver CV
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
