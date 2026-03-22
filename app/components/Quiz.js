"use client";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [showWrong, setShowWrong] = useState(false);
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      question: "Where did we first start talking properly?",
      options: [
        "Instagram DM",
        "Air Port",
        "That random late night chat",
        "Bus stop",
      ],
      answer: 0,
    },
    {
      question: "What is the thing I always say about you?",
      options: [
        "You are cute but dangerous",
        "You are my peace",
        "You are annoying",
        "You talk too much",
      ],
      answer: 2,
    },
    {
      question: "What is the one thing I secretly love about you?",
      options: ["Your smile", "The way you care", "Your voice", "All of them"],
      answer: 1,
    },
    {
      question: "What do I wish for you every day? 😄",
      options: ["More sleep", "More food", "Your happiness", "New phone"],
      answer: 3,
    },
  ];

  const handleAnswer = (index) => {
    if (index === questions[step].answer) {
      if (step === questions.length - 1) {
        confetti({ particleCount: 200, spread: 120 });
        setFinished(true);
      } else {
        setStep(step + 1);
      }
    } else {
      setShowWrong(true);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20 text-center">
      {/* Wrong answer popup */}
      {showWrong && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl text-center animate-bounce">
            <h3 className="text-xl text-red-500 mb-3">Wrong answer 😏</h3>
            <p className="mb-4 text-gray-700">Someone forgot our memories?</p>
            <button
              onClick={() => setShowWrong(false)}
              className="bg-pink-500 text-white px-6 py-2 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!finished ? (
        <>
          {/* Question paper style card */}
          <div className="bg-white/80 backdrop-blur-lg shadow-xl p-10 rounded-3xl border border-pink-200">
            <h2 className="text-sm text-gray-500 mb-2">
              Question {step + 1} / {questions.length}
            </h2>

            <h1 className="text-2xl font-bold mb-8 text-gray-800">
              {questions[step].question}
            </h1>

            <div className="grid gap-4">
              {questions[step].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="text-black border border-pink-300 hover:bg-pink-500 hover:text-white px-6 py-3 rounded-xl transition duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10">
          {/* Love letter animation */}
          <div className="bg-pink-50 p-10 rounded-3xl shadow-xl border border-pink-200 animate-[letterOpen_1s_ease]">
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              A Letter For You 💌
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg">
              Happy Birthday to the most special person in my life. I don't know
              how you slowly became such an important part of my days, but now
              every moment feels incomplete without you.
              <br />
              <br />
              Your smile, your little talks, even your silly complaints somehow
              became my favorite things.
              <br />
              <br />
              I may not always say it perfectly, but I truly appreciate you more
              than words can explain.
              <br />
              <br />
              I hope this birthday brings you happiness, peace, and everything
              your heart wishes for.
              <br />
              <br />
              And selfishly... I hope I get to stay part of your story for a
              very long time. ❤️
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
