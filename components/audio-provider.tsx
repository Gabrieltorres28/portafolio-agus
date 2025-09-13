"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

type AudioCtx = {
  isPlaying: boolean;
  toggleAudio: () => Promise<void>;
};

const Ctx = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.src = "/music/mixkit-sicilian-coffee-613(mp3cut.net).mp3";   // <-- poné tu archivo acá
    el.loop = true;
    el.preload = "auto";
    el.muted = true;              // <-- clave para autoplay
    el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const toggleAudio = async () => {
    const el = ref.current;
    if (!el) return;
    if (el.muted) el.muted = false;   // primer click: desmutea
    if (el.paused) {
      await el.play();
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Ctx.Provider value={{ isPlaying, toggleAudio }}>
      <audio ref={ref} playsInline />
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside <AudioProvider>");
  return ctx;
}
