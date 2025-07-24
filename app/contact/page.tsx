"use client"

import { motion } from "framer-motion"
import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-green-400">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Email</p>
                    <p className="text-white font-medium">agustin.torres@email.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="text-white font-medium">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Let's Build Something Amazing</h3>
              <p className="text-gray-300 leading-relaxed">
                With 7+ years of experience in web development and 4 years in AI, I'm passionate about creating
                innovative solutions that make a difference. Whether it's a complex web application or an AI-powered
                system, I'm here to help bring your vision to reality.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
