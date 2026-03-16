// "use client";
// import { useState } from "react";

// export default function ProposalRing() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="flex flex-col items-center mt-20">
//       <button
//         onClick={() => setOpen(true)}
//         className="bg-pink-500 px-6 py-3 rounded-full text-white text-xl shadow-lg animate-bounce"
//       >
//         💍 Click for Surprise
//       </button>

//       {open && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <div className="relative bg-white p-10 rounded-3xl text-center animate-pulse">
//             {/* Close Button */}
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute top-3 right-4 text-black text-2xl hover:scale-125 transition"
//             >
//               ✕
//             </button>

//             <div className="text-6xl">💍</div>

//             <h2 className="text-3xl mt-4 text-black">
//               Will You Be Mine Forever?
//             </h2>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function ProposalRing() {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-pink-500 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:scale-110 transition"
      >
        Open the Ring 💍
      </button>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-10 rounded-3xl text-center shadow-2xl max-w-md w-full animate-modalIn"
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-5 text-xl text-black hover:scale-125 transition"
            >
              ✕
            </button>

            {!accepted ? (
              <>
                {/* Ring */}
                <div className="text-7xl animate-bounce">💍</div>

                <h2 className="text-3xl mt-4 text-black font-bold">
                  Will You Be Mine Forever?
                </h2>

                <div className="flex justify-center gap-6 mt-8">
                  <button
                    onClick={handleAccept}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl hover:scale-110 transition"
                  >
                    Yes ❤️
                  </button>

                  <button
                    onClick={handleAccept}
                    className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:scale-110 transition"
                  >
                    Also Yes 😏
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4">
                <h2 className="text-3xl font-bold text-pink-600">
                  Forever Starts Now ❤️
                </h2>

                <p className="mt-3 text-gray-700">
                  I knew you couldn't say no 😌
                </p>

                <div className="text-4xl mt-4 animate-ping">💖 💕 💗</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}