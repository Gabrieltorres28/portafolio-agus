"use client"

import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { Button } from "@/components/ui/button"
import { Download, ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-preview")
    projectsSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Agustín Torres
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 h-16"
        >
          <TypeAnimation
            sequence={[
              "Senior Fullstack Developer",
              2000,
              "AI & Machine Learning Engineer",
              2000,
              "Web Development Expert",
              2000,
              "Innovation Enthusiast",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          24 years old with 7+ years of experience crafting exceptional web experiences and 4 years pioneering AI
          solutions. Passionate about turning complex problems into elegant, scalable solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
            onClick={scrollToProjects}
          >
            View My Work
            <ArrowDown className="ml-2 w-5 h-5" />
          </Button>

          <Button
  variant="outline"
  size="lg"
  asChild
  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 text-lg bg-transparent"
>
  <a
    href="/CV_Gabriel_Torres_Actualizado.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Download className="mr-2 w-5 h-5" />
    Ver CV
  </a>
</Button>

        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="animate-bounce"
        >
          <ArrowDown className="w-8 h-8 text-gray-400 mx-auto" />
        </motion.div>
      </div>
    </section>
  )
}
