"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function MemoryCarousel({images, title, sub}) {


  const [rotation, setRotation] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const startX = useRef(0);

  const radius = 520;

  // Generate sparkles only once (performance fix)
  const sparkles = useMemo(() => {
    return [...Array(35)].map(() => ({
      size: Math.random() * 3 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random(),
    }));
  }, []);

  // Auto rotate
  useEffect(() => {
    if (isHover) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev - 360 / images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHover]);

  const next = () => {
    confetti({ particleCount: 50, spread: 45 });
    setRotation((r) => r - 360 / images.length);
  };

  const prev = () => {
    confetti({ particleCount: 50, spread: 45 });
    setRotation((r) => r + 360 / images.length);
  };

  const handleDragStart = (e) => {
    startX.current = e.clientX || e.touches[0].clientX;
  };

  const handleDragEnd = (e) => {
    const endX = e.clientX || e.changedTouches[0].clientX;

    if (endX - startX.current > 50) prev();
    if (startX.current - endX > 50) next();
  };

  return (
    <section className="relative flex flex-col items-center text-center overflow-hidden mb-0">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-black opacity-80"></div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: `${s.left}%`,
              top: `${s.top}%`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <h2 className="relative z-10 text-5xl md:text-6xl font-extrabold mb-10 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text mt-15 py-20">
        {title} <br />{sub}
      </h2>

      {/* Carousel */}
      <div
        className="relative w-full h-[500px] flex items-center justify-center perspective-[2500px] z-10"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative w-[420px] h-[470px] mx-auto transition-transform duration-700 ease-out will-change-transform"
          // className="relative w-[520px] h-[380px] mx-auto transition-transform duration-700 ease-out will-change-transform"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg) translateZ(0)`,
          }}
        >
          {images.map((img, i) => {
            const angle = (360 / images.length) * i;

            return (
              <div
                key={i}
                className="absolute w-[420px] h-[470px] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(255,0,150,0.35)]"
                // className="absolute w-[520px] h-[380px] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(255,0,150,0.35)]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={img}
                  fill
                  alt="memory"
                  className="object-fit rounded-3xl"
                  sizes="420px"
                  priority={i < 3}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex gap-10 m-12">
        <button
          onClick={prev}
          className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/40 transition text-white text-lg"
        >
          ⬅ Prev
        </button>

        <button
          onClick={next}
          className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/40 transition text-white text-lg"
        >
          Next ➡
        </button>
      </div>
    </section>
  );
}