// components/chess-board.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PieceType = "bishop" | "queen" | null;
type Square = { piece: PieceType; color: "light" | "dark" };
type Coord = { r: number; c: number };

export interface ChessBoardProps {
  /** Se dispara cuando terminas TODOS los puzzles (antes era “capturaste la reina”) */
  onPuzzleSolved?: () => void;
  /** Se dispara en cada acierto por puzzle (útil para revelar bio línea por línea) */
  onStep?: (info: { puzzleIndex: number }) => void;
  /** Tamaño de casilla en px (auto por defecto) */
  cellSize?: number;
  /** Modo alto contraste para mejor legibilidad */
  highContrast?: boolean;
}

/** ======= CONFIG DE PUZZLES ======= */
const BOARD_SIZE = 8;
const PUZZLES: { bishop: Coord; queen: Coord; hint?: string }[] = [
  { bishop: { r: 5, c: 1 }, queen: { r: 2, c: 3 }, hint: "Diagonal NE: sube y a la derecha." },
  { bishop: { r: 6, c: 6 }, queen: { r: 3, c: 3 }, hint: "Diagonal NO: sube y a la izquierda." },
  { bishop: { r: 4, c: 0 }, queen: { r: 1, c: 3 }, hint: "Diagonal NE larga. No te pases." },
];

function buildEmptyBoard(): Square[][] {
  return Array.from({ length: BOARD_SIZE }, (_, r) =>
    Array.from({ length: BOARD_SIZE }, (_, c) => ({
      piece: null as PieceType,
      color: (r + c) % 2 === 0 ? "light" : "dark",
    })),
  );
}
function placePieces(base: Square[][], bishop: Coord, queen: Coord): Square[][] {
  const b = base.map(row => row.map(sq => ({ ...sq })));
  b[bishop.r][bishop.c].piece = "bishop";
  b[queen.r][queen.c].piece = "queen";
  return b;
}
function eq(a: Coord, b: Coord) { return a.r === b.r && a.c === b.c; }
function isDiagonal(a: Coord, b: Coord) { return Math.abs(a.r - b.r) === Math.abs(a.c - b.c); }

function pieceGlyph(p: PieceType) {
  return p === "bishop" ? "♗" : p === "queen" ? "♛" : "";
}
function findPiece(board: Square[][], piece: PieceType): Coord | null {
  for (let r = 0; r < BOARD_SIZE; r++)
    for (let c = 0; c < BOARD_SIZE; c++)
      if (board[r][c].piece === piece) return { r, c };
  return null;
}

export function ChessBoard({
  onPuzzleSolved,
  onStep,
  cellSize,
  highContrast = false,
}: ChessBoardProps) {
  const [pIdx, setPIdx] = useState(0);
  const base = useMemo(buildEmptyBoard, []);
  const [board, setBoard] = useState(() =>
    placePieces(base, PUZZLES[0].bishop, PUZZLES[0].queen)
  );
  const [selected, setSelected] = useState<Coord | null>(null);
  const [targets, setTargets] = useState<Coord[]>([]);
  const [msg, setMsg] = useState("Seleccioná el alfil y capturá la reina.");
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const bishopPos = findPiece(board, "bishop");
  const queenPos = findPiece(board, "queen");

  // Tamaño adaptativo si no se fija via prop
  const square = useMemo(() => {
    if (cellSize) return cellSize;
    // heurística simple: móvil vs escritorio
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (w < 380) return 40;
      if (w < 640) return 44;
      if (w < 1024) return 52;
    }
    return 56;
  }, [cellSize]);

  // Calcula diagonales del alfil (para resaltar destinos)
  const calcTargets = (): Coord[] => {
    if (!bishopPos) return [];
    const dirs = [
      { dr: 1, dc: 1 }, { dr: 1, dc: -1 },
      { dr: -1, dc: 1 }, { dr: -1, dc: -1 },
    ];
    const t: Coord[] = [];
    for (const { dr, dc } of dirs) {
      let r = bishopPos.r + dr, c = bishopPos.c + dc;
      while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
        t.push({ r, c });
        if (queenPos && r === queenPos.r && c === queenPos.c) break;
        r += dr; c += dc;
      }
    }
    return t;
  };

  const resetCurrent = () => {
    const pz = PUZZLES[pIdx];
    setBoard(placePieces(base, pz.bishop, pz.queen));
    setSelected(null);
    setTargets([]);
    setMsg("Reiniciado. Alfil → Reina.");
    setShake(false);
  };

  const nextPuzzle = () => {
    const next = pIdx + 1;
    if (next >= PUZZLES.length) {
      setMsg("¡Completaste todos los puzzles!");
      onPuzzleSolved?.();
      return;
    }
    const pz = PUZZLES[next];
    setBoard(placePieces(base, pz.bishop, pz.queen));
    setSelected(null);
    setTargets([]);
    setMsg("Nuevo puzzle: capturá la reina con el alfil.");
    setShowHint(false);
    setShake(false);
    setPIdx(next);
  };

  const handleSquare = (r: number, c: number) => {
    const sq = board[r][c];

    // Primer click: seleccionar alfil
    if (!selected) {
      if (sq.piece === "bishop") {
        setSelected({ r, c });
        setTargets(calcTargets());
        setMsg("Bien. Ahora clic en la reina para capturarla.");
      } else {
        setMsg("Primero seleccioná el alfil.");
        setShake(true); setTimeout(() => setShake(false), 180);
      }
      return;
    }

    // Segundo click: intento de movimiento
    const from = selected;
    const to = { r, c };

    // Deselección
    if (eq(from, to)) {
      setSelected(null);
      setTargets([]);
      setMsg("Seleccioná el alfil y capturá la reina.");
      return;
    }

    // Validación mínima: diagonal + casilla destino = reina
    if (queenPos && isDiagonal(from, to) && eq(to, queenPos)) {
      const newBoard = board.map(row => row.map(s => ({ ...s })));
      newBoard[from.r][from.c].piece = null;
      newBoard[to.r][to.c].piece = "bishop";
      setBoard(newBoard);
      setSelected(null);
      setTargets([]);

      setMsg("¡Excelente! Capturaste a la reina.");
      onStep?.({ puzzleIndex: pIdx });

      // Avanzar con pequeña pausa
      setTimeout(nextPuzzle, 900);
    } else {
      setSelected(null);
      setTargets([]);
      setMsg("Movimiento inválido. Los alfiles van en diagonal. Intentá de nuevo.");
      setShake(true); setTimeout(() => setShake(false), 180);
    }
  };

  // Teclado: Enter confirma casilla enfocada, Escape para deseleccionar
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null); setTargets([]); setMsg("Seleccioná el alfil y capturá la reina.");
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const progress = ((pIdx) / PUZZLES.length) * 100;

  return (
    <section aria-label="Ajedrez — Puzzle de alfil captura reina">
      {/* Header + Progreso */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Puzzle {pIdx + 1} / {PUZZLES.length}
        </div>
        <div className="flex-1 max-w-xs h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full bg-sky-500 transition-all"
            style={{ width: `${progress}%` }}
            aria-hidden
          />
        </div>
      </div>

      {/* Mensaje */}
      <AnimatePresence mode="wait">
        <motion.p
          key={msg}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mb-3 text-sm text-gray-700 dark:text-gray-300"
          role="status"
        >
          {msg}
        </motion.p>
      </AnimatePresence>

      {/* Tablero */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: .98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={[
          "inline-block rounded-xl border",
          highContrast
            ? "border-gray-900 dark:border-white"
            : "border-gray-300 dark:border-gray-600",
          shake ? "animate-[shake_.18s_ease-in-out]" : "",
        ].join(" ")}
        tabIndex={0}
      >
        <div
          className="grid gap-0 overflow-hidden rounded-xl"
          style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, ${square}px)` }}
        >
          {board.map((row, r) =>
            row.map((sq, c) => {
              const isSel = selected && selected.r === r && selected.c === c;
              const isTgt = targets.some(t => t.r === r && t.c === c);

              const light = highContrast ? "bg-white" : "bg-amber-100 dark:bg-[var(--muted,#0B1220)]";
              const dark  = highContrast ? "bg-black" : "bg-amber-800 dark:bg-[var(--brand-muted,#0B2540)]";
              const base  = sq.color === "light" ? light : dark;

              const piece = board[r][c].piece;
              const text  = piece === "queen"
                ? "text-red-600 dark:text-red-400"
                : highContrast
                  ? "text-black dark:text-white"
                  : "text-gray-800 dark:text-gray-100";

              return (
                <motion.button
                  key={`${r}-${c}`}
                  onClick={() => handleSquare(r, c)}
                  whileTap={{ scale: 0.96 }}
                  className={[
                    "flex items-center justify-center font-bold transition-all duration-150 select-none outline-none",
                    base, text,
                    isSel ? "ring-4 ring-sky-400" : "hover:ring-2 hover:ring-sky-300/80",
                    isTgt ? "outline outline-2 outline-sky-300/60" : "",
                  ].join(" ")}
                  style={{ width: square, height: square, fontSize: Math.max(18, square * 0.42) }}
                  aria-label={`fila ${r + 1}, columna ${c + 1}${piece ? `, ${piece === "bishop" ? "alfil" : "reina"}` : ""}`}
                >
                  {pieceGlyph(piece)}
                </motion.button>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Controles */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={resetCurrent}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Reiniciar puzzle
        </button>
        <button
          onClick={() => setShowHint(s => !s)}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {showHint ? "Ocultar pista" : "Mostrar pista"}
        </button>
        <button
          onClick={nextPuzzle}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Siguiente
        </button>
      </div>

      {/* Pista */}
      <AnimatePresence>
        {showHint && PUZZLES[pIdx].hint && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-xs text-gray-600 dark:text-gray-400"
          >
            💡 {PUZZLES[pIdx].hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shake keyframes (inline para no tocar tu CSS) */}
      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

export default ChessBoard;
