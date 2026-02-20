// app/about/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** ==================== CONFIG ==================== */
const GRID = 3; // 3x3
type Cell = { r: number; c: number };
type Step = number; // 0..8 (index de celda)
const IDX = (r: number, c: number) => r * GRID + c;

const FACTS = [
  "🎓 Systems Analyst specialized in software development and database design.",
  "🛠️ Tech stack: Next.js, Tailwind CSS, Prisma, PostgreSQL.",
  "⚙️ Backend & Enterprise: C#, .NET (WPF), SQL Server.",
  "🏛️ Experience: Institutional web platforms and management systems.",
  "🎸 Music producer and guitarist since age 9.",
  "🚀 Focused on building scalable solutions and high-impact projects.",
];
function randInt(n: number) { return Math.floor(Math.random() * n); }

/** Paletas para celdas (buen contraste en dark/light) */
const COLORS = [
  { from: "#a78bfa", to: "#38bdf8" },
  { from: "#f472b6", to: "#fb923c" },
  { from: "#34d399", to: "#a3e635" },
  { from: "#60a5fa", to: "#e879f9" },
];

/** ==================== COMPONENTE ==================== */
export default function AboutPage() {
  // estado del juego
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<Step[]>([]);
  const [showing, setShowing] = useState(false);
  const [inputIdx, setInputIdx] = useState(0);
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(0); // cuántos facts revelar
  const [msg, setMsg] = useState("Mirá el patrón y repetilo tocando las celdas.");

  // celdas 0..8
  const cells = useMemo(() => {
    const arr: Cell[] = [];
    for (let r = 0; r < GRID; r++) for (let c = 0; c < GRID; c++) arr.push({ r, c });
    return arr;
  }, []);

  // refs para controlar el highlight al mostrar patrón
  const [active, setActive] = useState<number | null>(null);
  const playTimeouts = useRef<number[]>([]);

  // genera o extiende la secuencia para el nivel actual
  const buildSequence = (base: Step[], len: number) => {
    const seq = [...base];
    while (seq.length < len) seq.push(randInt(GRID * GRID));
    return seq;
  };

  // muestra la secuencia animada
  const playSequence = (seq: Step[]) => {
    setShowing(true);
    setMsg(`Nivel ${level}: mirá el patrón…`);
    // limpiar timeouts previos
    playTimeouts.current.forEach(clearTimeout);
    playTimeouts.current = [];

    const baseDelay = 500; // pausa inicial
    seq.forEach((idx, i) => {
      const t1 = window.setTimeout(() => setActive(idx), baseDelay + i * 650);
      const t2 = window.setTimeout(() => setActive(null), baseDelay + i * 650 + 400);
      playTimeouts.current.push(t1, t2);
    });

    const done = window.setTimeout(() => {
      setActive(null);
      setShowing(false);
      setMsg("Repetí el patrón.");
      setInputIdx(0);
    }, baseDelay + seq.length * 650 + 50);
    playTimeouts.current.push(done);
  };

  // arranca / reinicia nivel
  const startLevel = (lvl: number) => {
    const seq = buildSequence([], Math.min(3 + (lvl - 1), 8)); // crece de 3 hasta 8 pasos
    setSequence(seq);
    setInputIdx(0);
    playSequence(seq);
  };

  useEffect(() => {
    startLevel(level);
    // cleanup timeouts on unmount
    return () => playTimeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  // click del usuario
  const onCell = (idx: number) => {
    if (showing) return; // no permitir input mientras se muestra
    const expected = sequence[inputIdx];
    if (idx === expected) {
      // correcto
      const next = inputIdx + 1;
      setInputIdx(next);
      if (next === sequence.length) {
        // nivel completado
        setUnlocked((u) => Math.min(u + 1, FACTS.length));
        if (level >= 5) {
          setMsg("¡Excelente! Completaste todos los retos.");
        } else {
          setMsg("¡Bien! Nivel superado.");
          setTimeout(() => setLevel((l) => l + 1), 750);
        }
      } else {
        setMsg("Bien. Seguí el patrón…");
      }
    } else {
      // error
      setMsg("Ups, ese no iba. Mirá de nuevo el patrón.");
      setShake(true);
      setTimeout(() => setShake(false), 220);
      // replay del nivel actual
      setTimeout(() => playSequence(sequence), 500);
    }
  };

  const progress = Math.min(100, (unlocked / FACTS.length) * 100);

  // tamaño de celda adaptativo
  const cellSize = useMemo(() => {
    if (typeof window === "undefined") return 72;
    const w = window.innerWidth;
    if (w < 380) return 60;
    if (w < 640) return 64;
    if (w < 1024) return 72;
    return 80;
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-sky-500 to-fuchsia-500 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
            Seguí el patrón luminoso. Cada nivel desbloquea una parte de mi historia.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          {/* JUEGO */}
          <motion.section
            initial={{ opacity: 0, scale: .98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={[
              "rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur",
              "border-gray-200 dark:border-gray-700 p-6"
            ].join(" ")}
          >
            {/* HUD */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Nivel {level} / 5
              </div>
              <div className="flex-1 max-w-xs h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-sky-500 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Mensaje */}
            <AnimatePresence mode="wait">
              <motion.p
                key={msg}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mb-4 text-sm text-gray-700 dark:text-gray-300"
              >
                {msg}
              </motion.p>
            </AnimatePresence>

            {/* GRID */}
            <motion.div
              initial={{ opacity: 0, scale: .98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={[
                "inline-block rounded-2xl border overflow-hidden",
                "border-gray-300 dark:border-gray-600",
                shake ? "animate-[shake_.22s_ease-in-out]" : ""
              ].join(" ")}
            >
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${GRID}, ${cellSize}px)` }}
              >
                {cells.map((cell, i) => {
                  const isActive = active === i;
                  const palette = COLORS[i % COLORS.length];
                  return (
                    <button
                      key={i}
                      onClick={() => onCell(i)}
                      disabled={showing}
                      className={[
                        "relative flex items-center justify-center select-none",
                        "transition-all duration-150 outline-none",
                        "bg-white/70 dark:bg-slate-900/40 backdrop-blur",
                        "hover:ring-2 hover:ring-sky-300/70",
                        showing ? "cursor-not-allowed" : "cursor-pointer",
                      ].join(" ")}
                      style={{ width: cellSize, height: cellSize }}
                      aria-label={`celda ${i + 1}`}
                    >
                      {/* Glow/gradiente */}
                      <motion.span
                        animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                        transition={{ duration: 0.22 }}
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
                          opacity: isActive ? 0.9 : 0.15,
                          filter: isActive ? "blur(10px)" : "blur(14px)"
                        }}
                      />
                      {/* Disco central */}
                      <motion.span
                        animate={isActive ? { scale: 0.86 } : { scale: 0.82 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="relative rounded-xl w-[70%] h-[70%] shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${palette.from}, ${palette.to})`,
                          boxShadow: isActive
                            ? "0 8px 30px rgba(56,189,248,.35)"
                            : "0 4px 18px rgba(15,23,42,.25)",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Controles */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => startLevel(level)}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Repetir patrón
              </button>
              <button
                onClick={() => setLevel((l) => Math.min(l + 1, 5))}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Siguiente nivel
              </button>
              <button
                onClick={() => { setLevel(1); setUnlocked(0); }}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Reiniciar juego
              </button>
            </div>

            {/* keyframes de shake inline */}
            <style jsx>{`
              @keyframes shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(-3px); }
                50% { transform: translateX(3px); }
                75% { transform: translateX(-2px); }
                100% { transform: translateX(0); }
              }
            `}</style>
          </motion.section>

          {/* PANEL INFO (se revela con el progreso) */}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur border-gray-200 dark:border-gray-700 p-6"
          >
            <h2 className="text-xl font-semibold mb-3">Sobre mí</h2>
            {unlocked === 0 ? (
              <p className="text-gray-700 dark:text-gray-300">
                Completá un nivel para empezar a desbloquear información.
              </p>
            ) : (
              <ul className="space-y-2">
                {FACTS.slice(0, unlocked).map((line, i) => (
                  <li
                    key={i}
                    className="text-sm leading-relaxed border-l-2 pl-3 text-gray-700 dark:text-gray-300"
                    style={{ borderColor: "#38bdf8" }}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
