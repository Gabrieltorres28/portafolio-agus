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

  // Autoplay silencioso (para que cargue el buffer sin bloquear)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onCanPlay = () => {
      el.play().then(() => {
        // Está "sonando" pero muteado (background). No marcamos isPlaying=true para no confundir el toggle visual.
        el.pause();
      }).catch(() => {});
    };
    el.addEventListener("canplaythrough", onCanPlay, { once: true });
    return () => el.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  // Auto-resume al primer gesto del usuario en la página (por si el botón no se presionó todavía)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const firstInteraction = async () => {
      try {
        el.muted = false;
        el.volume = 0.6;
        await el.play();
        setIsPlaying(true);
      } catch {
        // si falla, no pasa nada; el botón hará el trabajo
      } finally {
        window.removeEventListener("pointerdown", firstInteraction);
        window.removeEventListener("keydown", firstInteraction);
      }
    };
    window.addEventListener("pointerdown", firstInteraction, { once: true });
    window.addEventListener("keydown", firstInteraction, { once: true });
    return () => {
      window.removeEventListener("pointerdown", firstInteraction);
      window.removeEventListener("keydown", firstInteraction);
    };
  }, []);

  const forcePlay = async () => {
    const el = ref.current!;
    el.muted = false;
    el.volume = 0.6;
    try {
      await el.play();
      setIsPlaying(true);
    } catch (err: any) {
      // Si el navegador sigue bloqueando, nos colgamos al próximo gesto y reintentamos.
      if (err && err.name === "NotAllowedError") {
        const retry = async () => {
          try {
            el.muted = false;
            el.volume = 0.6;
            await el.play();
            setIsPlaying(true);
          } catch {
            // si incluso acá falla, hay otra cosa (ruta/CORS)
          } finally {
            window.removeEventListener("pointerdown", retry);
            window.removeEventListener("keydown", retry);
          }
        };
        window.addEventListener("pointerdown", retry, { once: true });
        window.addEventListener("keydown", retry, { once: true });
      } else {
        console.error("Play error:", err);
      }
    }
  };

  const toggleAudio = async () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      await forcePlay();
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Ctx.Provider value={{ isPlaying, toggleAudio }}>
      <audio
        ref={ref}
        src="/music/bg.mp3"
        preload="auto"
        loop
        muted
        defaultMuted
        playsInline
        // crossOrigin="anonymous" // si lo sirves desde CDN/otro dominio
        onError={(e) => console.error("Error cargando /music/bg.mp3", e)}
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
