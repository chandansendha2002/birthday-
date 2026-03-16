
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MemorySlider() {
  const images = [
    "/memories/mem1.jpg",
    "/memories/mem2.jpg",
    "/memories/mem3.jpg",
    "/memories/mem4.jpg",
    "/memories/mem5.jpg",
    "/memories/mem6.jpg",
    "/memories/mem7.jpg",
    "/memories/mem8.jpg",
    "/memories/mem9.jpg",
    "/memories/mem10.jpg",
    "/memories/mem11.jpg",
    "/memories/mem13.jpg",
    "/memories/mem14.jpg",
    "/memories/mem15.jpg",
    "/memories/mem16.jpg",
    "/memories/mem17.jpg",
    "/memories/mem18.jpg",
    "/memories/mem19.jpg",
    "/memories/mem20.jpg",
    "/memories/mem21.jpg",
    "/memories/mem22.jpg",
    "/memories/mem23.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const nextSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setAnimate(true);
    }, 300);
  };

  const prevSlide = () => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setAnimate(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-32 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Animated Heading */}
      <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-transparent bg-clip-text animate-pulse mb-16">
        Our Beautiful Journey 📸✨
      </h2>

      {/* Cinematic Container */}
      <div className="relative w-[90%] md:w-[70%] h-[700px] group">
        {/* Background Blur Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 blur-3xl opacity-30 group-hover:opacity-60 transition duration-700"></div>

        {/* Image */}
        <div
          className={`relative w-full h-full transition-all duration-700 transform ${
            animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Background Blur */}
          <Image
            src={images[index]}
            fill
            alt="memory"
            priority
            className="object-cover blur-3xl scale-110 opacity-40 rounded-3xl"
          />

          {/* Main Image (Full visible) */}
          <Image
            src={images[index]}
            fill
            alt="memory"
            priority
            className="object-contain rounded-3xl shadow-[0_20px_80px_rgba(255,0,150,0.4)] transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg text-white px-5 py-3 rounded-full text-xl hover:bg-white/40 transition"
        >
          ❮
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-lg text-white px-5 py-3 rounded-full text-xl hover:bg-white/40 transition"
        >
          ❯
        </button>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent rounded-b-3xl"></div>
      </div>

      {/* Progress Bar */}
      <div className="mt-10 w-1/2 bg-white/20 h-2 rounded-full overflow-hidden">
        <div
          key={index}
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-[progress_5s_linear]"
          style={{ width: "100%" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}






// "use client";
// import { useEffect, useState, useRef } from "react";

// export default function MemoryGallery() {
//   const images = [
//     "/memories/pic1.jpg",
//     "/memories/pic2.jpg",
//     "/memories/pic3.jpg",
//   ];

//   const [index, setIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const intervalRef = useRef(null);

//   const nextSlide = () => {
//     setFade(false);
//     setTimeout(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//       setFade(true);
//     }, 300);
//   };

//   const prevSlide = () => {
//     setFade(false);
//     setTimeout(() => {
//       setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//       setFade(true);
//     }, 300);
//   };

//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       nextSlide();
//     }, 4000);

//     return () => clearInterval(intervalRef.current);
//   }, []);

//   const pauseAuto = () => clearInterval(intervalRef.current);

//   const resumeAuto = () => {
//     intervalRef.current = setInterval(() => {
//       nextSlide();
//     }, 4000);
//   };

//   return (
//     <div className="flex flex-col items-center mt-20 space-y-6">
//       {/* Title */}
//       <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
//         Our Beautiful Memories 💖
//       </h2>

//       {/* Image Container */}
//       <div
//         className="relative group"
//         onMouseEnter={pauseAuto}
//         onMouseLeave={resumeAuto}
//       >
//         {/* Glow Effect */}
//         <div className="absolute inset-0 rounded-3xl blur-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 opacity-30 group-hover:opacity-60 transition duration-700"></div>

//         {/* Image */}
//         <img
//           src={images[index]}
//           className={`relative w-96 h-96 object-cover rounded-3xl shadow-2xl transition-all duration-700 transform ${
//             fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
//           }`}
//         />

//         {/* Prev Button */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md px-3 py-2 rounded-full text-white hover:bg-white/50 transition"
//         >
//           ◀
//         </button>

//         {/* Next Button */}
//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md px-3 py-2 rounded-full text-white hover:bg-white/50 transition"
//         >
//           ▶
//         </button>
//       </div>

//       {/* Dots Indicator */}
//       <div className="flex space-x-3">
//         {images.map((_, i) => (
//           <div
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
//               i === index ? "bg-pink-500 scale-125" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
