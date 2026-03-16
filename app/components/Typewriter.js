// "use client";
// import Typewriter from "typewriter-effect";

// export default function RomanticMessage() {
//   return (
//     <div className="h-screen flex items-center justify-center text-3xl text-center">
//       <Typewriter
//         options={{
//           strings: [
//             "Happy Birthday My Love ❤️",
//             "You are my forever...",
//             "Every moment with you is magic ✨",
//           ],
//           autoStart: true,
//           loop: true,
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import confetti from "canvas-confetti";

export default function RomanticMessage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Confetti burst
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });

    // Firework canvas animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;

      for (let i = 0; i < 80; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 4 + 2,
          radius: 2,
          life: 100,
        });
      }
    }

    setInterval(createFirework, 2000);

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
        ctx.fill();

        if (p.life <= 0) particles.splice(index, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
      {/* Canvas Fireworks */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-xl">
          🎂 Happy Birthday
        </h1>

        <div className="text-2xl md:text-3xl leading-relaxed drop-shadow-md font-light">
          <Typewriter
            options={{
              strings: [
                "To the most beautiful soul in my life ❤️",
                "Every moment with you feels magical ✨",
                "You are my today, my tomorrow, and my forever 💕",
                "This little website is just a small surprise for you 🎁",
              ],
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 20,
            }}
          />
        </div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <span
            key={i}
            className="absolute animate-heartFloat text-pink-400"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-40px",
              fontSize: `${20 + Math.random() * 20}px`,
              animationDuration: `${6 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={scrollDown}
        className="absolute bottom-10 flex flex-col items-center cursor-pointer animate-bounce z-10"
      >
        <span className="text-sm mb-2 opacity-80">Scroll Down</span>

        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scrollDot"></div>
        </div>

        <span className="text-2xl mt-2">↓</span>
      </div>
    </section>
  );
}