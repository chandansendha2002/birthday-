// "use client";

// import { motion, useMotionValue, animate } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useRef } from "react";

// export default function MemorySlider() {
//   const images = Array.from({ length: 45 }, (_, i) =>
//     `/memories/pic${i + 1}.jpg`
//   );

//   const x = useMotionValue(0);
//   const containerRef = useRef(null);
//   const animationRef = useRef(null);

//   const startAutoScroll = () => {
//     const totalWidth = containerRef.current.scrollWidth / 2;

//     animationRef.current = animate(x, -totalWidth, {
//       duration: 60,
//       ease: "linear",
//       onUpdate: (latest) => {
//         if (latest <= -totalWidth) {
//           x.set(0); // reset seamlessly
//         }
//       },
//     });
//   };

//   const stopAutoScroll = () => {
//     if (animationRef.current) {
//       animationRef.current.stop();
//     }
//   };

//   useEffect(() => {
//     startAutoScroll();
//     return () => stopAutoScroll();
//   }, []);

//   const handleDragEnd = () => {
//     startAutoScroll(); // resume from current position
//   };

//   return (
//     <section className="relative py-40 bg-gradient-to-b from-pink-100 via-white to-pink-100 overflow-hidden">

//       <h2 className="text-center text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-transparent bg-clip-text mb-24">
//         Just Her ✨ The Most Beautiful Chapter
//       </h2>

//       <div
//         className="overflow-hidden cursor-grab active:cursor-grabbing"
//         onMouseEnter={stopAutoScroll}
//         onMouseLeave={startAutoScroll}
//       >
//         <motion.div
//           ref={containerRef}
//           style={{ x }}
//           drag="x"
//           dragElastic={0.1}
//           onDragStart={stopAutoScroll}
//           onDragEnd={handleDragEnd}
//           className="flex gap-10 px-10 min-h-170 items-center"
//         >
//           {[...images, ...images].map((src, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.06 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="relative min-w-[320px] h-[550px] rounded-3xl overflow-hidden shadow-2xl group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

//               <Image
//                 src={src}
//                 fill
//                 alt="her memory"
//                 className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function MemorySlider() {
  const images = Array.from(
    { length: 45 },
    (_, i) => `/memories/pic${i + 1}.jpg`,
  );
  console.log(images);

  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const startAutoScroll = () => {
    if (!containerRef.current) return;
    animationRef.current?.stop();

    const totalWidth = containerRef.current.scrollWidth / 2;

    animationRef.current = animate(x, -totalWidth, {
      duration: 60,
      ease: "linear",
      onUpdate: (latest) => {
        if (latest <= -totalWidth) {
          x.set(latest + totalWidth);
        }
      },
    });
  };

  const stopAutoScroll = () => {
    animationRef.current?.stop();
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const handleDragEnd = () => {
    const totalWidth = containerRef.current.scrollWidth / 2;

    let current = x.get();

    if (current <= -totalWidth) {
      x.set(current + totalWidth);
    }

    if (current > 0) {
      x.set(current - totalWidth);
    }

    startAutoScroll();
  };

  return (
    <section className="relative py-40 overflow-hidden bg-black mb-0">
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Blob 1 */}
        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-pink-500/40 rounded-full blur-[140px] top-0 left-0"
        />

        {/* Blob 2 */}
        <motion.div
          animate={{ y: [0, 60, 0], x: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[700px] h-[700px] bg-purple-500/40 rounded-full blur-[160px] bottom-0 right-0"
        />

        {/* Soft Moving Light */}
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <h2 className="text-center text-5xl pb-10 md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text mb-24">
          You Are My Favorite Story ✨ And My Forever Chapter
        </h2>

        {/* Slider */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          <motion.div
            ref={containerRef}
            style={{ x }}
            drag="x"
            dragElastic={0.1}
            onDragStart={stopAutoScroll}
            onDragEnd={handleDragEnd}
            className="flex gap-10 px-10 min-h-170 items-center"
          >
            {[...images, ...images].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                initial={{ scale: 0.9 }} // 👈 add
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative min-w-[320px] h-[550px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(255,0,150,0.3)] group backdrop-blur-sm"
              >
                {/* Glow Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />

                <Image
                  src={src}
                  fill
                  alt="her memory"
                  loading="lazy"
                  sizes="(max-width: 768px) 200px, 320px"
                  className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}