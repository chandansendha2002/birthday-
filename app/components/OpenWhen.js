// "use client";
// import { useState } from "react";

// export default function OpenWhen() {
//   const [open, setOpen] = useState(null);

//   const letters = [
//     {
//       title: "Open When You Miss Me",
//       message:
//         "If you're reading this, it means you miss me. Just remember, distance never changes how much I care about you. I'm always somewhere thinking about you ❤️",
//     },
//     {
//       title: "Open When You're Sad",
//       message:
//         "I know things might feel heavy right now. But remember how strong you are. You've survived every difficult day before this one too. And I'm always here for you.",
//     },
//     {
//       title: "Open When You Can't Sleep",
//       message:
//         "Close your eyes and imagine we're talking like we usually do. Laughing about random things. Maybe the night just wanted you to remember me.",
//     },
//     {
//       title: "Open On Your Birthday",
//       message:
//         "Happy Birthday to the most beautiful soul I know. I hope this year brings you endless happiness. And selfishly... I hope I get to stay part of your life for a long time ❤️",
//     },
//   ];

//   return (
//     <div className="mt-24 mb-40 text-center">
//       <h2 className="text-4xl font-bold mb-12 text-pink-500">
//         💌 Open When...
//       </h2>

//       <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto z-40">
//         {letters.map((item, index) => (
//           <div
//             key={index}
//             className="relative bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/30 hover:scale-105 transition cursor-pointer"
//           >
//             <button
//               onClick={() => setOpen(index)}
//               className="text-lg font-semibold text-white"
//             >
//               {item.title}
//             </button>

//             {/* Letter Modal */}
//             {open === index && (
//               <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//                 <div className="bg-white text-gray-800 max-w-md p-8 rounded-3xl shadow-2xl animate-letterOpen relative">
//                   <button
//                     onClick={() => setOpen(null)}
//                     className="absolute top-4 right-4 text-xl"
//                   >
//                     ✕
//                   </button>

//                   <h3 className="text-2xl font-bold text-pink-500 mb-4">
//                     {item.title}
//                   </h3>

//                   <p className="leading-relaxed text-lg">{item.message}</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function OpenWhen() {
  const [openLetter, setOpenLetter] = useState(null);

  const letters = [
    {
      title: "Open When You Miss Me",
      message:
        "If you're reading this, it means you miss me. Just remember I'm always thinking about you ❤️",
    },
    {
      title: "Open When You're Sad",
      message:
        "Even on your hardest days, remember how strong you are. I'm always here for you.",
    },
    {
      title: "Open When You Can't Sleep",
      message:
        "Close your eyes and imagine we're talking like we usually do. Maybe the night just wanted you to remember me.",
    },
    {
      title: "Open On Your Birthday",
      message:
        "Happy Birthday to the most special person in my life. I hope this year brings you endless happiness ❤️",
    },
  ];

  return (
    <div className="mt-24 mb-40 text-center">
      <h2 className="text-4xl font-bold mb-12 text-pink-500">
        💌 Open When...
      </h2>

      {/* LETTER BUTTONS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {letters.map((item, index) => (
          <button
            key={index}
            onClick={() => setOpenLetter(item)}
            className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/30 hover:scale-105 transition text-lg font-semibold text-white"
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* LETTER MODAL */}
      {openLetter && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setOpenLetter(null)}
        >
          <div
            className="relative bg-white text-gray-800 max-w-md p-8 rounded-3xl shadow-2xl animate-letterOpen"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpenLetter(null)}
              className="absolute top-4 right-4 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-pink-500 mb-4">
              {openLetter.title}
            </h3>

            <p className="leading-relaxed text-lg">{openLetter.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}