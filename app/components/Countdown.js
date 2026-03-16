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

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const format = (num) => String(num).padStart(2, "0");

  return (
    <section className="flex flex-col items-center justify-center text-center py-14 px-4">
      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text">
        Countdown To Our Special Moment 💖
      </h2>

      {/* Timer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="relative flex flex-col items-center justify-center 
            w-20 h-20 md:w-30 md:h-30 
            rounded-2xl 
            bg-black/40 backdrop-blur-lg
            border border-pink-400/30
            shadow-[0_0_20px_rgba(255,0,150,0.4)]
            transition transform hover:scale-105"
          >
            <span className="text-3xl md:text-5xl font-bold text-white tracking-widest">
              {format(item.value)}
            </span>

            <span className="text-sm md:text-base text-pink-300 mt-2 uppercase tracking-widest">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="mt-5 text-2xl md:text-4xl font-bold text-white leading-relaxed">
        Timer khatam hone tak <br />
        <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text">
          Aap gana suno
        </span>
        <span>😘🥰</span>
      </div>
    </section>
  );
}