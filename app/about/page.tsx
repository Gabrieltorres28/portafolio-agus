"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChessBoard } from "@/components/chess-board"
import { AboutContent } from "@/components/about-content"

export default function AboutPage() {
  const [puzzleSolved, setPuzzleSolved] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Me
          </h1>
          {!puzzleSolved && (
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Solve the chess puzzle to unlock my story. Capture the hanging queen with your bishop!
            </p>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!puzzleSolved ? (
            <motion.div
              key="chess"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <ChessBoard onPuzzleSolved={() => setPuzzleSolved(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AboutContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
