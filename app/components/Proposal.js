"use client";
import { useState } from "react";

export default function Proposal() {
  const [answer, setAnswer] = useState(null);

  const handleYes = () => {
    setAnswer("yes");
  };

  const handleAlsoYes = () => {
    setAnswer("alsoYes");
  };

  return (
    <div className="mt-24 text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold mb-8">
        Will you stay with me forever? 💍
      </h2>

      <div className="flex gap-6 justify-center">
        <button
          onClick={handleYes}
          className="bg-green-500 hover:bg-green-600 hover:scale-110 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
        >
          Yes ❤️
        </button>

        <button
          onClick={handleAlsoYes}
          className="bg-pink-500 hover:bg-pink-600 hover:scale-110 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
        >
          Also Yes 😏
        </button>
      </div>

      {answer === "yes" && (
        <p className="mt-8 text-xl animate-fadeIn">
          I knew it 😌 Forever starts now ❤️
        </p>
      )}

      {answer === "alsoYes" && (
        <p className="mt-8 text-xl animate-fadeIn">
          Smart choice 😏 Now you're officially stuck with me forever ❤️
        </p>
      )}
    </div>
  );
}

