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
  const images1 = [
    "/memories/mem3.jpg",
    "/memories/mem5.jpg",
    "/memories/mem6.jpg",
    "/memories/mem8.jpg",
    "/memories/mem11.jpg",
    "/memories/mem13.jpg",
    "/memories/mem15.jpg",
    "/memories/mem21.jpg",
  ];
  const images2 = [
    "/memories/mem2.jpg",
    "/memories/mem4.jpg",
    "/memories/mem9.jpg",
    "/memories/mem10.jpg",
    "/memories/mem14.jpg",
    "/memories/mem19.jpg",
    "/memories/mem16.jpg",
    "/memories/mem20.jpg",
  ];
  const images3 = [
    "/memories/mem12.jpg",
    "/memories/mem17.jpg",
    "/memories/mem22.jpg",
    "/memories/mem23.jpg",
    "/memories/mem7.jpg",
    "/memories/mem1.jpg",
    "/memories/mem24.jpg",
    "/memories/mem18.jpg",
  ];

  useEffect(() => {
    const unlockDate = new Date(Date.UTC(2026, 2, 22, 18, 30, 0));
    // const unlockDate = new Date(Date.UTC(2026, 2, 22, 9, 30, 0));
    // const unlockDate = new Date();
    //     unlockDate.setHours(0);
    //     unlockDate.setMinutes(0);
    //     unlockDate.setSeconds(0);
    const lockDate = new Date(unlockDate.getTime() - 2 * 60 * 1000);
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
          <MemoryCarousel
            images={images1}
            title={"Where Our Story Began 💖"}
            sub={"Every memory in Delhi… is a piece of my heart"}
          />
          <MemoryCarousel
            images={images2}
            title={"Moments That Made Us Stronger ❤️"}
            sub={"From Hyderabad… to forever together"}
          />
          <MemoryCarousel
            images={images3}
            title={"Every Moment With You Is My Favorite 🎂💖"}
            sub={"On your special day… I just want to say I love you"}
          />

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