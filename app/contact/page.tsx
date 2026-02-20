"use client"

import { motion } from "framer-motion"
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

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                    <p className="text-white font-medium">agustinpiraywa@email.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Phone</p>
                    <p className="text-white font-medium">+543751471708</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">¿
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-300">Location</p>
                    <p className="text-white font-medium">Puerto Piray, Argentina</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Let's Build Something Amazing</h3>
              <p className="text-gray-300 leading-relaxed">
                Más de 5 años creando y estudiando para estar siempre al dia con nuevas tecnologías, soy Analista de sistemas en computacion y sigo formándome como profesional. Me gustan los proyectos claros y bien hechos.
                Si necesitas un producto listo para usar o mejorar el que ya tenés, hablemos y lo sacamos adelante.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
