

"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ unlocked }) {
  const audioRef = useRef(null);

  const playlist = [
    { src: "/music/odia/megha-kadamba.mp3", name: "Megha Kadamba" },
    { src: "/music/boyfriend.mp3", name: "Boyfriend" },
    { src: "/music/sawaal.mp3", name: "Sawaal" },

    { src: "/music/ranjha.mp3", name: "Ranjha" },
    { src: "/music/sahiba.mp3", name: "Sahiba" },
    { src: "/music/shaky.mp3", name: "Shaky" },
    { src: "/music/sunn-mere-yaar-ve.mp3", name: "Sunn Mere Yaar Ve" },
    { src: "/music/tere-liye.mp3", name: "Tere Liye" },
    { src: "/music/tum-ho-toh.mp3", name: "Tum Ho Toh" },
    { src: "/music/aaj-se-teri.mp3", name: "Aaj Se Teri" },
    { src: "/music/arz-kiya-hai.mp3", name: "Arz Kiya Hai" },
    { src: "/music/danger-param-sundari.mp3", name: "Danger Param Sundari" },
    { src: "/music/deewaniyat.mp3", name: "Deewaniyat" },
    { src: "/music/ehsaas.mp3", name: "Ehsaas" },
    { src: "/music/gehra-hua.mp3", name: "Gehra Hua" },
    { src: "/music/haule-haule.mp3", name: "Haule Haule" },
    { src: "/music/ishqa-ve.mp3", name: "Ishqa Ve" },
    { src: "/music/ishq-bulaava.mp3", name: "Ishq Bulaava" },
    { src: "/music/janiye.mp3", name: "Janiye" },
    { src: "/music/jugraafiya.mp3", name: "Jugraafiya" },
    { src: "/music/meri-zindagi-hai-tu.mp3", name: "Meri Zindagi Hai Tu" },
  ];

  const birthdaySong = {
    src: "/music/sawaal.mp3",
    name: "🎂 Happy Birthday My Love",
  };

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBirthdayMode, setIsBirthdayMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // 🎂 Trigger birthday song
  useEffect(() => {
    if (unlocked) {
      setIsBirthdayMode(true);
      setIsPlaying(true);
    }
  }, [unlocked]);

  // 🎵 Handle audio source safely
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const song = isBirthdayMode ? birthdaySong : playlist[current];

    audio.src = song.src;
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [current, isPlaying, isBirthdayMode]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);
    audioRef.current.currentTime = seekTime;
    setProgress(seekTime);
  };

  const handleEnded = () => {
    if (!isBirthdayMode) {
      setCurrent((prev) => (prev + 1) % playlist.length);
    }
  };

  const nextSong = () => {
    setIsBirthdayMode(false);
    setCurrent((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    setIsBirthdayMode(false);
    setCurrent((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const currentSong = isBirthdayMode
    ? birthdaySong.name
    : playlist[current].name;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-99 shadow-2xl text-white">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* 🎵 Song Name */}
      <div className="text-center mb-2">
        <p
          className={`font-semibold ${isBirthdayMode ? "text-pink-400 animate-pulse" : ""}`}
        >
          {currentSong}
        </p>
      </div>

      {/* 🎛 Controls */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={prevSong}
          className="text-2xl hover:scale-110 transition"
        >
          ⏮
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-3xl font-bold hover:scale-110 transition"
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <button
          onClick={nextSong}
          className="text-2xl hover:scale-110 transition"
        >
          ⏭
        </button>
      </div>

      {/* 📊 Progress */}
      <div className="flex items-center gap-2 text-sm">
        <span>{formatTime(progress)}</span>

        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-pink-500 cursor-pointer"
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}