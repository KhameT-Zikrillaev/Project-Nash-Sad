'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winnerLine, setWinnerLine] = useState([]);
  const [player1Name, setPlayer1Name] = useState(""); // Имя первого игрока
  const [player2Name, setPlayer2Name] = useState(""); // Имя второго игрока
  const [gameStarted, setGameStarted] = useState(false); // Статус начала игры

  const playSound = () => {
    if (typeof window !== "undefined") {
      const audio = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3");
      audio.volume = 0.2;
      audio.play().catch(e => console.log("Audio error:", e));
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return { winner: null, line: [] };
  };

  useEffect(() => {
    const { winner, line } = calculateWinner(board);
    if (winner) {
      setWinnerLine(line);
    } else {
      setWinnerLine([]);
    }
  }, [board]);

  const handleClick = (i) => {
    if (board[i] || winnerLine.length) return;
    playSound();

    const newBoard = board.slice();
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, newBoard]);
    setCurrentMove(newHistory.length);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
    setBoard(history[move]);
    setIsXNext(move % 2 === 0);
    setWinnerLine([]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setWinnerLine([]);
  };

  const winner = winnerLine.length ? board[winnerLine[0]] : null;
  const isDraw = !winner && board.every((square) => square !== null);

  const status = winner
    ? `🎉 Победил: ${winner === "X" ? player1Name : player2Name}`
    : isDraw
    ? "🤝 Ничья!"
    : `Ходит: ${isXNext ? player1Name : player2Name}`;

  const Square = ({ value, index }) => {
    const isWinnerSquare = winnerLine.includes(index);
    return (
      <motion.button
        className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl font-bold rounded-xl 
          ${isWinnerSquare ? "bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-200" : "bg-white/10 backdrop-blur-sm"} 
          transition-all duration-150 hover:scale-105`}
        onClick={() => handleClick(index)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={{ scale: value ? [0.8, 1.1, 1] : 1 }}
          transition={{ duration: 0.15 }}
        >
          {value}
        </motion.span>
      </motion.button>
    );
  };

  const startGame = () => {
    if (player1Name.trim() === "" || player2Name.trim() === "") return; // Если имена не введены
    setGameStarted(true); // Начать игру
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center p-4 text-white">
      {!gameStarted ? (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            Крестики-нолики
          </h1>
          <p className="text-lg text-white/80 mb-4">Введите имена игроков для начала игры:</p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Имя игрока 1"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/20 text-white w-64 mb-2 text-center"
            />
            <input
              type="text"
              placeholder="Имя игрока 2"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/20 text-white w-64 text-center"
            />
          </div>
          <motion.button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Начать игру
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
              Крестики-нолики
            </h1>
            <p className="text-lg text-white/80 mb-4">{status}</p>
          </motion.div>

          {/* Статус игры */}
          <motion.div
            className="text-2xl font-semibold mb-6 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm"
            animate={{
              scale: winner || isDraw ? [1, 1.05, 1] : 1,
              backgroundColor: winner
                ? "rgba(74, 222, 128, 0.2)"
                : isDraw
                ? "rgba(251, 191, 36, 0.2)"
                : "rgba(255, 255, 255, 0.1)",
            }}
          >
            {status}
          </motion.div>

          {/* Игровое поле */}
          <motion.div
            className="grid grid-cols-3 gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {board.map((_, i) => (
              <Square key={i} value={board[i]} index={i} />
            ))}
          </motion.div>

          {/* История ходов */}
          <motion.div
            className="mb-6 w-full max-w-md bg-white/5 rounded-xl p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-2">История ходов:</h3>
            <div className="flex flex-wrap gap-2">
              {history.map((_, move) => (
                <motion.button
                  key={move}
                  onClick={() => jumpTo(move)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    move === currentMove
                      ? "bg-cyan-500/30 border border-cyan-400"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {move === 0 ? "Начало" : `Ход ${move}`}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Кнопка сброса */}
          <motion.button
            onClick={resetGame}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold shadow-lg hover:shadow-cyan-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Новая игра
          </motion.button>
        </>
      )}
    </div>
  );
}
