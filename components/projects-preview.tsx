"use client"

import { ProjectCard } from "@/components/project-card"

export interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  demo: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sistema Municipal Villa Esperanza",
    description:
      "Un sistema que permite a los ciudadanos actuar de manera directa con votaciones para un mejor uso de los organismos estatales.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    image: "/villaesperanza.png", // Subí esta imagen a tu carpeta /public
    github: "", // Si no tenés repo público, dejalo así
    demo: "https://v0-simulated-budget-system.vercel.app"
  }
]

export default function ProjectsPreview() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
