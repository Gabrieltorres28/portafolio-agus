"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "./audio-provider"

export function AudioToggle() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <Button variant="ghost" size="sm" onClick={toggleAudio} className="text-gray-300 hover:text-white">
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      <span className="sr-only">{isPlaying ? "Mute background music" : "Play background music"}</span>
    </Button>
  )
}
