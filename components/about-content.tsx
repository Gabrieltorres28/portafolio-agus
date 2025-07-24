"use client"

import { motion } from "framer-motion"
import { Code, Brain, Rocket, Heart } from "lucide-react"

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "AI/ML",
    items: ["TensorFlow", "PyTorch", "OpenAI API", "Computer Vision", "NLP"],
  },
  {
    category: "DevOps",
    items: ["Docker", "AWS", "Vercel", "CI/CD", "Kubernetes"],
  },
]

const achievements = [
  {
    icon: Code,
    title: "7+ Years Experience",
    description: "Building scalable web applications and leading development teams",
  },
  {
    icon: Brain,
    title: "AI Pioneer",
    description: "4 years developing cutting-edge AI solutions and machine learning models",
  },
  {
    icon: Rocket,
    title: "Innovation Leader",
    description: "Successfully launched 20+ projects from concept to production",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "Committed to creating technology that makes a positive impact",
  },
]

export function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">The Story Behind the Code</h2>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            At 24, I've already spent over 7 years immersed in the world of web development, starting my journey when I
            was just 17. What began as curiosity about how websites work evolved into a deep passion for creating
            digital experiences that matter.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Four years ago, I discovered the transformative power of artificial intelligence and machine learning. Since
            then, I've been at the forefront of integrating AI into web applications, creating intelligent systems that
            not only function beautifully but also learn and adapt.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            I believe technology should be a force for good. Every line of code I write, every system I architect, and
            every problem I solve is driven by the desire to create something meaningful that improves people's lives.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">What Drives Me</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <achievement.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                  <p className="text-gray-300">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">Technical Expertise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
            >
              <h4 className="text-lg font-bold text-purple-400 mb-4">{skillGroup.category}</h4>
              <div className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <div key={skill} className="bg-gray-700/50 px-3 py-2 rounded-lg text-sm text-gray-300">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
