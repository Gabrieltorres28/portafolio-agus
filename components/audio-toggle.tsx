"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "./audio-provider"
import { useEffect, useState } from "react"

export function AudioToggle() {
  const { isPlaying, toggleAudio } = useAudio()
  const [mounted, setMounted] = useState(false)

  // Solución para problemas de hidratación (Next.js)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleAudio}
      className={`text-gray-300 hover:text-white ${isPlaying ? "text-cyan-400 animate-pulse" : ""}`}
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      <span className="sr-only">
        {isPlaying ? "Mute background music" : "Play background music"}
      </span>
    </Button>
  )
}
