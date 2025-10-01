"use client";
import { createContext, useContext, useRef, useState } from "react";

type AudioCtx = {
  isPlaying: boolean;
  toggleAudio: () => Promise<void>;
};

const Ctx = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = async () => {
    const el = ref.current;
    if (!el) return;

    try {
      // Siempre desmuteamos antes de cualquier acción
      el.muted = false;
      el.volume = 0.6;

      if (el.paused) {
        await el.play();       // Reproduce
        setIsPlaying(true);    // Cambiamos el estado al instante
      } else {
        el.pause();            // Pausa
        setIsPlaying(false);
      }
    } catch (err) {
      console.error("Error al reproducir:", err);
    }
  };

  return (
    <Ctx.Provider value={{ isPlaying, toggleAudio }}>
      <audio
        ref={ref}
        src="/music/bg.mp3"
        preload="auto"
        loop
        playsInline
      />
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
