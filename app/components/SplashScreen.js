"use client";
import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    setTimeout(onFinish, 4000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-4xl animate-pulse">
      A Magical Surprise is Loading...
    </div>
  );
}
