"use client"

import { useState } from "react"
import { motion } from "framer-motion"

type PieceType = "bishop" | "queen" | null
type Square = {
  piece: PieceType
  color: "light" | "dark"
}

const initialBoard: Square[][] = [
  [
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
  ],
  [
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
  ],
  [
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: "queen", color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
  ],
  [
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
  ],
  [
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
  ],
  [
    { piece: null, color: "light" },
    { piece: "bishop", color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
  ],
  [
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
  ],
  [
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
    { piece: null, color: "light" },
    { piece: null, color: "dark" },
  ],
]

interface ChessBoardProps {
  onPuzzleSolved: () => void
}

export function ChessBoard({ onPuzzleSolved }: ChessBoardProps) {
  const [board, setBoard] = useState<Square[][]>(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [message, setMessage] = useState("Click the bishop, then click the queen to capture it!")

  const handleSquareClick = (row: number, col: number) => {
    if (!selectedSquare) {
      // First click - select piece
      if (board[row][col].piece === "bishop") {
        setSelectedSquare([row, col])
        setMessage("Good! Now click on the queen to capture it.")
      } else {
        setMessage("Click on the bishop first!")
      }
    } else {
      // Second click - attempt move
      const [selectedRow, selectedCol] = selectedSquare

      if (row === selectedRow && col === selectedCol) {
        // Deselect
        setSelectedSquare(null)
        setMessage("Click the bishop, then click the queen to capture it!")
        return
      }

      // Check if it's a valid diagonal move to the queen
      const rowDiff = Math.abs(row - selectedRow)
      const colDiff = Math.abs(col - selectedCol)

      if (rowDiff === colDiff && board[row][col].piece === "queen") {
        // Valid capture!
        const newBoard = board.map((r) => r.map((s) => ({ ...s })))
        newBoard[selectedRow][selectedCol].piece = null
        newBoard[row][col].piece = "bishop"
        setBoard(newBoard)
        setSelectedSquare(null)
        setMessage("Excellent! You've solved the puzzle!")

        setTimeout(() => {
          onPuzzleSolved()
        }, 1500)
      } else {
        setMessage("Invalid move! Bishops move diagonally. Try again.")
        setSelectedSquare(null)
      }
    }
  }

  const getPieceSymbol = (piece: PieceType) => {
    switch (piece) {
      case "bishop":
        return "♗"
      case "queen":
        return "♛"
      default:
        return ""
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
      >
        <p className="text-center text-lg text-gray-300 mb-4">{message}</p>

        <div className="grid grid-cols-8 gap-0 border-2 border-gray-600 rounded-lg overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((square, colIndex) => (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  w-12 h-12 flex items-center justify-center text-2xl font-bold transition-all duration-200
                  ${square.color === "light" ? "bg-amber-100" : "bg-amber-800"}
                  ${
                    selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                      ? "ring-4 ring-purple-400"
                      : "hover:ring-2 hover:ring-purple-300"
                  }
                  ${square.piece === "queen" ? "text-red-600" : "text-gray-800"}
                `}
              >
                {getPieceSymbol(square.piece)}
              </motion.button>
            )),
          )}
        </div>

        <div className="mt-4 text-sm text-gray-400 text-center">
          <p>Hint: The bishop is at the bottom left, the queen is hanging in the middle.</p>
          <p>Bishops move diagonally any number of squares.</p>
        </div>
      </motion.div>
    </div>
  )
}
