"use client";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Fireworks() {
  useEffect(() => {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 5, spread: 70 });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  return null;
}
