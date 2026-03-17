// "use client";

// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import OpenWhen from "./components/OpenWhen";
// import MemorySlider from "./components/MemorySlider";
// import Proposal from "./components/Proposal";
// import LoveMeter from "./components/LoveMeter";
// import confetti from "canvas-confetti";
// import { motion } from "framer-motion";

// // ⛔ Disable SSR for countdown (avoid hydration mismatch)
// const Countdown = dynamic(() => import("./components/Countdown"), {
//   ssr: false,
// });

// const MusicPlayer = dynamic(() => import("./components/MusicPlayer"), {
//   ssr: false,
// });

// export default function Home() {
//   const [unlocked, setUnlocked] = useState(false);

//   useEffect(() => {
//     // const unlockDate = new Date();
//     // unlockDate.setHours(3);
//     // unlockDate.setMinutes(10);
//     // unlockDate.setSeconds(0);
//     const unlockDate = new Date(Date.UTC(2026, 2, 22, 18, 30, 0));
//     console.log(
//       unlockDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
//     );

//     const interval = setInterval(() => {
//       if (new Date() >= unlockDate) {
//         setUnlocked(true);
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 text-white flex flex-col items-center text-center p-6">
//       {/* Heading */}
//       <motion.h1
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-4xl md:text-5xl font-bold mt-10"
//       >
//         {unlocked
//           ? "Happy Birthday My Love ❤️"
//           : "Something Magical is Coming..."}
//       </motion.h1>

//       {/* Countdown Before Unlock */}
//       {!unlocked && <Countdown />}

//       {/* Music Button */}
//       <MusicPlayer />

//       {/* Premium Sections After Unlock */}
//       {unlocked && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="w-full flex flex-col items-center"
//         >
//           <MemorySlider />
//           <OpenWhen />
//           <LoveMeter />
//           <Proposal />
//         </motion.div>
//       )}

//       {/* Hidden Dev Easter Egg */}
//       <div className="mt-12 opacity-60 text-xs">
//         {/* If you're reading this in inspect... yes, forever starts with you ❤️ */}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import PasswordGate from "./components/PasswordGate";
import SplashScreen from "./components/SplashScreen";
import MusicPlayer from "./components/MusicPlayer";
import Fireworks from "./components/Fireworks";
import Typewriter from "./components/Typewriter";
import FloatingHearts from "./components/FloatingHearts";
import Countdown from "./components/Countdown";
import GalaxyBackground from "./components/GalaxyBackground";
import MemorySlider from "./components/MemorySlider";
import MemoryGallery from "./components/MemoryGallery";
import LoveMeter from "./components/LoveMeter";
import Proposal from "./components/Proposal";
import ProposalRing from "./components/ProposalRing";
import Quiz from "./components/Quiz";
import OpenWhen from "./components/OpenWhen";
import MemoryCarousel from "./components/MemoryCarousel";

export default function Home() {
  const [authorized, setAuthorized] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [level, setLevel] = useState(100);

  useEffect(() => {
    const unlockDate = new Date(Date.UTC(2026, 2, 22, 18, 30, 0));
    // const unlockDate = new Date();
    //     unlockDate.setHours(0);
    //     unlockDate.setMinutes(0);
    //     unlockDate.setSeconds(0);
    const lockDate = new Date(unlockDate.getTime() - 0 * 60 * 1000);
    console.log(unlockDate);
    console.log(lockDate);

    const interval = setInterval(() => {
      const now = new Date();
      // console.log(now)

      if (now >= lockDate && now < unlockDate) {
        setAuthorized(false);
      }

      if (now >= unlockDate) {
        setUnlocked(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔐 PASSWORD
  if (!authorized)
    return <PasswordGate onSuccess={() => setAuthorized(true)} />;

  // 🌟 SPLASH
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 🌌 Background */}
      {!unlocked && <GalaxyBackground />}
      <FloatingHearts level={level} />
      <MusicPlayer unlocked={unlocked} />

      {/* 🔒 BEFORE UNLOCK */}
      {!unlocked && (
        <div className="flex flex-col items-center justify-start pt-20 h-screen text-white text-center space-y-6">
          <p className="text-4xl md:text-5xl font-bold">
            Something magical is coming...
          </p>
          <Countdown />
        </div>
      )}

      {/* 💖 AFTER UNLOCK */}
      {unlocked && (
        <div className="bg-gradient-to-br from-pink-300 to-yellow-200 min-h-screen text-center space-y-20 pb-20">
          <Fireworks />
          <Typewriter />

          <MemorySlider />
          {/* <MemoryGallery /> */}
          {/* <MemoryCarousel /> */}

          <FloatingHearts level={level} />
          <LoveMeter onLevelChange={setLevel} />

          <Proposal />
          <ProposalRing />

          <Quiz />

          <OpenWhen />
        </div>
      )}
    </main>
  );
}