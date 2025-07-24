"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true) // que inicie activado
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/mickit-sicilian-coffe-613(mp3cut).mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Intentar reproducir automáticamente
    const tryPlay = () => {
      audioRef.current?.play().catch((err) => {
        console.warn("Autoplay bloqueado por el navegador:", err)
        setIsPlaying(false)
      })
    }

    tryPlay()

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(console.error)
      }
      setIsPlaying(!isPlaying)
    }
  }

  return <AudioContext.Provider value={{ isPlaying, toggleAudio }}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
