// "use client";
// import { useEffect, useState } from "react";

// export default function Countdown() {
//   const [mounted, setMounted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState({});

//   const targetDate = new Date("2026-03-23T00:00:00");

//   useEffect(() => {
//     setMounted(true);

//     const timer = setInterval(() => {
//       const difference = targetDate - new Date();

//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // Prevent SSR mismatch
//   if (!mounted) return null;

//   return (
//     <>
//       <div className="flex gap-6 text-xl font-semibold mt-6">
//         {Object.entries(timeLeft).map(([label, value]) => (
//           <div key={label} className="bg-white/20 px-4 py-2 rounded-xl">
//             {value} {label}
//           </div>
//         ))}
//       </div>
//       <div className="mt-20 text-4xl md:text-5xl font-bold">
//         Timer khatam hone tak Aap gana suno 😘🥰.
//       </div>
//     </>
//   );
// }
"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-03-23T00:00:00");
  const surpriseStart = new Date("2026-03-18T00:20:00");
  const SURPRISE_DURATION = 25 * 60 * 1000;

  const calculateTimeLeft = () => {
    const diff = targetDate - new Date();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 🔥 Surprise Logic
  useEffect(() => {
    if (!mounted) return;

    const now = Date.now();
    const start = surpriseStart.getTime();

    if (now >= start) {
      setIsUnlocked(true);

      let openTime = localStorage.getItem("surpriseOpenTime");

      if (!openTime) {
        localStorage.setItem("surpriseOpenTime", now);
        openTime = now;
      }

      const elapsed = now - openTime;

      if (elapsed > SURPRISE_DURATION) {
        setIsExpired(true);
      }
    }
  }, [mounted]);

  if (!mounted) return null;

  const format = (num) => String(num).padStart(2, "0");

  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen text-center text-white px-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text">
        Countdown To Your Special Day 💖
      </h2>

      {/* ⏳ MAIN COUNTDOWN (ALWAYS VISIBLE) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Days", value: format(timeLeft?.days || 0) },
          { label: "Hours", value: format(timeLeft?.hours || 0) },
          { label: "Minutes", value: format(timeLeft?.minutes || 0) },
          { label: "Seconds", value: format(timeLeft?.seconds || 0) },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            {/* Flip Card */}
            <div className="relative w-20 h-24 md:w-28 md:h-32 perspective">
              {/* Top Half */}
              <div className="absolute top-0 left-0  w-full h-1/2 bg-neutral-900 rounded-t-xl flex items-end justify-center overflow-hidden border-b border-black z-60">
                <span className="text-3xl md:text-5xl font-bold text-white translate-y-1/2">
                  {item.value}
                </span>
              </div>

              {/* Bottom Half */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-neutral-800 rounded-b-xl flex items-start justify-center overflow-hidden z-60">
                <span className="text-3xl md:text-5xl font-bold text-white -translate-y-1/2">
                  {item.value}
                </span>
              </div>

              {/* Flip Animation */}
              <div
                key={item.value}
                className="absolute inset-0 z-30 animate-flip5 flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front face */}
                <div className="w-full h-1/2 bg-neutral-700 rounded-t-xl border-b border-black backface-hidden"></div>

                {/* Bottom face */}
                <div className="w-full h-1/2 bg-neutral-800 rounded-b-xl backface-hidden"></div>
              </div>
            </div>

            {/* Label */}
            <div className="text-xs md:text-sm text-pink-300 mt-2 uppercase tracking-widest">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 🎁 SURPRISE SECTION */}
      {isUnlocked && !isExpired && (
        <div className="mt-6">
          <p className="mb-4 text-lg">
            Aaj ke liye ek chhota sa surprise hai wait for 10 min. 😏
          </p>
        </div>
      )}

      {/* ❌ EXPIRED MESSAGE */}
      {isExpired && (
        <div className="mt-6 text-red-400 text-xl">
          Aab Gana Suno tum.......❤️❤️
        </div>
      )}
      <div className="text-5xl text-center mt-20">Sorry 😢</div>
    </section>
  );
}