// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, useMotionValue, useSpring } from "framer-motion";

// export default function LoveMeter({ target = 100 }) {
//   const [value, setValue] = useState(0);
//   const [started, setStarted] = useState(false);
//   const containerRef = useRef(null);

//   const progress = useMotionValue(0);
//   const smooth = useSpring(progress, {
//     stiffness: 80,
//     damping: 20,
//   });

//   // Trigger animation when visible
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setStarted(true);
//         }
//       },
//       { threshold: 0.5 },
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // Animate to target
//   useEffect(() => {
//     if (started) {
//       progress.set(target);
//     }
//   }, [started, target, progress]);

//   // Sync displayed value
//   useEffect(() => {
//     const unsubscribe = smooth.on("change", (latest) => {
//       setValue(Math.round(latest));
//     });
//     return () => unsubscribe();
//   }, [smooth]);

//   const increaseLove = () => {
//     progress.set(Math.min(value + 10, 200));
//   };

//   const resetLove = () => {
//     progress.set(0);
//   };

//   return (
//     <div ref={containerRef} className="mt-20 flex flex-col items-center gap-6">
//       <h2 className="text-3xl font-bold text-pink-400">Love Level ❤️</h2>

//       {/* Progress Bar */}
//       <div className="relative w-80 h-6 bg-white/10 backdrop-blur-xl rounded-full overflow-hidden border border-white/20">
//         <motion.div
//           style={{ width: smooth }}
//           className="h-full rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-pink-600"
//         />
//       </div>

//       {/* Percentage */}
//       <div className="text-2xl font-semibold text-pink-400">{value}%</div>

//       {/* Controls */}
//       <div className="flex gap-4">
//         <button
//           onClick={increaseLove}
//           className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:scale-105 transition"
//         >
//           Increase 💕
//         </button>

//         <button
//           onClick={resetLove}
//           className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:scale-105 transition"
//         >
//           Reset 🔄
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import FloatingHearts from "./FloatingHearts";

// export default function LoveMeter() {
//   const [value, setValue] = useState(0);
//   const [showMessage, setShowMessage] = useState(false);

//   const maxLove = 200;

//   const increaseLove = () => {
//     if (value >= maxLove) {
//       setShowMessage(true);
//       setTimeout(() => setShowMessage(false), 4000);
//       return;
//     }

//     setValue((v) => v + 10);
//   };

//   const resetLove = () => {
//     setValue(0);
//   };

//   // heart intensity logic
//   const heartIntensity = value < 50 ? 1 : value < 100 ? 2 : value < 150 ? 3 : 5;

//   return (
//     <div className="relative mt-20 flex flex-col items-center gap-6">
//       {/* Floating Hearts */}
//       <FloatingHearts intensity={heartIntensity} />

//       <h2 className="text-3xl font-bold text-pink-400">Love Level ❤️</h2>

//       {/* Progress Bar */}
//       <div className="relative w-80 h-6 bg-white/10 rounded-full overflow-hidden border border-white/20">
//         <motion.div
//           animate={{ width: `${value}%` }}
//           transition={{ type: "spring", stiffness: 80 }}
//           className="h-full rounded-full bg-gradient-to-r from-pink-500 via-red-400 to-pink-600"
//         />
//       </div>

//       <div className="text-2xl font-semibold text-pink-400">{value}%</div>

//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={increaseLove}
//           className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:scale-105 transition"
//         >
//           Increase 💕
//         </button>

//         <button
//           onClick={resetLove}
//           className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:scale-105 transition"
//         >
//           Reset 🔄
//         </button>
//       </div>

//       {/* Cute Message */}
//       {showMessage && (
//         <motion.div
//           initial={{ opacity: 0, y: 20, scale: 0.8 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0 }}
//           className="mt-6 bg-pink-500/20 backdrop-blur-xl text-pink-300 px-6 py-3 rounded-2xl shadow-lg border border-pink-400/30 text-center"
//         >
//           Baki sab ke liye to kuch chodo ya sab khudhi le jayogi 😭❤️
//         </motion.div>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function LoveMeter({ onLevelChange }) {
  const MAX_CAP = 200; // Hard stop
  const TOTAL_CAP = 300; // Visual container capacity

  const [value, setValue] = useState(100);
  const [showMessage, setShowMessage] = useState(false);
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    if (onLevelChange) {
      onLevelChange(value);
    }
  }, [value, onLevelChange]);

  const increaseLove = () => {
    if (value < MAX_CAP) {
      setValue((v) => v + 10);
    } else {
      setExplode(true);
      setShowMessage(true);

      setTimeout(() => setExplode(false), 600);
      setTimeout(() => setShowMessage(false), 2500);
    }
  };

  const resetLove = () => {
    setValue(100);
    setShowMessage(false);
  };

  // Width calculated relative to 300% container
  const widthPercent = (value / TOTAL_CAP) * 100;

  return (
    <div className="mt-16 w-full flex justify-center flex-col text-center relative">
      <h2 className="mb-2 text-lg font-semibold">Love Level ❤️</h2>

      {/* BAR CONTAINER (300% capacity visual) */}
      <div className="flex justify-center w-full">
        <div className="bg-white/20 h-5 w-100 rounded-full overflow-hidden relative">
          <div
            style={{ width: `${widthPercent}%` }}
            className="bg-pink-600 h-5 rounded-full transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* Percentage text (never above 200) */}
      <p className="mt-2 font-bold text-pink-400">{value}%</p>

      {/* Buttons */}
      <div className="mt-4 flex gap-4 justify-center">
        <button
          onClick={increaseLove}
          className="px-4 py-2 bg-pink-500 rounded-lg hover:scale-105 transition"
        >
          Increase ❤️
        </button>

        <button
          onClick={resetLove}
          className="px-4 py-2 bg-gray-500 rounded-lg hover:scale-105 transition"
        >
          Reset
        </button>
      </div>

      {/* Cute message */}
      {showMessage && (
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-pink-600 px-4 py-2 rounded-xl shadow-lg animate-bounce">
          Baki sab ke liye to kuch chodo ya sab khudhi le jayogi 😭❤️
        </div>
      )}

      {/* Small heart explosion */}
      {explode && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-4xl animate-ping">
          💖 💕 💗 💓
        </div>
      )}
    </div>
  );
}