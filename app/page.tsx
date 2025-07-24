"use client"

import { motion } from "framer-motion"
import { ParticlesBackground } from "@/components/particles-background"
import { HeroSection } from "@/components/hero-section"
import { SocialLinks } from "@/components/social-links"
import { ProjectsPreview } from "@/components/projects-preview"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10">
        <HeroSection />

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="container mx-auto px-4 py-16"
        >
          <SocialLinks />
        </motion.section>

        <ProjectsPreview />
      </div>
    </div>
  )
}
