"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Ruta correcta sin /public
    audioRef.current = new Audio("/mickit-sicilian-coffe-613(mp3cut.net).mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Intenta reproducir automáticamente
    audioRef.current.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      // Algunos navegadores bloquean autoplay hasta que el usuario interactúa
      setIsPlaying(false)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(console.error)
      }
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
