// "use client";

// import { useEffect, useState } from "react";

// export default function FloatingHearts() {
//   const [hearts, setHearts] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newHeart = {
//         id: Date.now(),
//         left: Math.random() * 100, // random horizontal position
//         size: Math.random() * 30 + 20, // random size
//         duration: Math.random() * 5 + 5, // animation speed
//       };

//       setHearts((prev) => [...prev, newHeart]);

//       // Remove heart after animation
//       setTimeout(() => {
//         setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
//       }, newHeart.duration * 1000);
//     }, 800);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
//       {hearts.map((heart) => (
//         <span
//           key={heart.id}
//           className="absolute animate-float"
//           style={{
//             left: `${heart.left}%`,
//             fontSize: `${heart.size}px`,
//             animationDuration: `${heart.duration}s`,
//           }}
//         >
//           ❤️
//         </span>
//       ))}

//       {/* Custom Animation */}
//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(100vh) scale(1);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-10vh) scale(1.3);
//             opacity: 0;
//           }
//         }

//         .animate-float {
//           animation-name: float;
//           animation-timing-function: ease-in;
//           animation-iteration-count: 1;
//         }
//       `}</style>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";

// export default function FloatingHearts({ intensity = 1 }) {
//   const [hearts, setHearts] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       for (let i = 0; i < intensity; i++) {
//         const newHeart = {
//           id: Date.now() + Math.random(),
//           left: Math.random() * 100,
//           size: Math.random() * 20 + 20,
//           duration: Math.random() * 4 + 4,
//         };

//         setHearts((prev) => [...prev, newHeart]);

//         setTimeout(() => {
//           setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
//         }, newHeart.duration * 1000);
//       }
//     }, 800);

//     return () => clearInterval(interval);
//   }, [intensity]);

//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
//       {hearts.map((heart) => (
//         <span
//           key={heart.id}
//           className="absolute animate-float"
//           style={{
//             left: `${heart.left}%`,
//             fontSize: `${heart.size}px`,
//             animationDuration: `${heart.duration}s`,
//           }}
//         >
//           ❤️
//         </span>
//       ))}

//       <style jsx>{`
//         @keyframes float {
//           0% {
//             transform: translateY(100vh);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-10vh);
//             opacity: 0;
//           }
//         }

//         .animate-float {
//           animation-name: float;
//           animation-timing-function: ease-in;
//           animation-iteration-count: 1;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

export default function FloatingHearts({ level }) {
  const [hearts, setHearts] = useState([]);

  const createHeart = (id) => ({
    id,
    left: Math.random() * 100,
    size: 20 + Math.random() * 20,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 3,
  });

  useEffect(() => {
    const base = 10;
    const extra = Math.max(0, Math.floor((level - 100) / 20));
    const targetCount = base + extra;

    setHearts((prev) => {
      // if we need more hearts → add them
      if (prev.length < targetCount) {
        const newHearts = [...prev];

        for (let i = prev.length; i < targetCount; i++) {
          newHearts.push(createHeart(i));
        }

        return newHearts;
      }

      // if reset → remove extras smoothly
      if (prev.length > targetCount) {
        return prev.slice(0, targetCount);
      }

      return prev;
    });
  }, [level]);
  console.log(hearts);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-pink-400 animate-float"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}