"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Instagram } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/agustintorres",
    color: "hover:text-gray-300",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/agustintorres",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/agustintorres",
    color: "hover:text-pink-400",
  },
]

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-8">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.2, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 text-gray-400 transition-all duration-300 ${link.color}`}
        >
          <link.icon className="w-6 h-6" />
          <span className="sr-only">{link.name}</span>
        </motion.a>
      ))}
    </div>
  )
}
