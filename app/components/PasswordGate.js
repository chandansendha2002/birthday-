"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function PasswordGate({ onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const correctPassword = "31-10-2024";

  const handleUnlock = () => {
    if (input.toLowerCase() === correctPassword) {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        onSuccess();
      }, 1200);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleUnlock();
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            className="absolute text-pink-400 animate-float3"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-40px",
              fontSize: `${16 + Math.random() * 24}px`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: error ? [-10, 10, -10, 10, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
        className="z-10 backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-4"
        >
          🎂 Birthday Surprise
        </motion.h1>

        <p className="opacity-80 mb-6">
          Enter the secret password to unlock your surprise ❤️
        </p>

        {/* Password Input */}
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={input}
            onKeyDown={handleKey}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password..."
            className="w-full p-3 rounded-xl text-white bg-white/20 border border-white/30 outline-none"
          />

          {/* Show/Hide */}
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-3 text-sm opacity-80"
          >
            {show ? "🙈" : "👁"}
          </button>
        </div>

        {/* Unlock Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlock}
          className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 py-3 rounded-xl font-semibold shadow-lg"
        >
          🔓 Unlock Surprise
        </motion.button>

        {/* Hint */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-sm mt-6 opacity-60"
        >
          Hint: when we meet (dd-mm-yyyy) 😉
        </motion.p>
      </motion.div>
    </div>
  );
}
