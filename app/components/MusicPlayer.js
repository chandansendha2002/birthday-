

"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ unlocked }) {
  const audioRef = useRef(null);

  const playlist = [
    { src: "/music/chaleya.mp3", name: "chaleya" },
    { src: "/music/odia/megha-kadamba.mp3", name: "Megha Kadamba" },
    { src: "/music/boyfriend.mp3", name: "Boyfriend" },
    { src: "/music/sawaal.mp3", name: "Sawaal" },
    { src: "/music/ranjha_shershaah.mp3", name: "ranjha_shershaah" },

    { src: "/music/khairiyat.mp3", name: "khairiyat" },
    { src: "/music/odia/oda-lage.mp3", name: "Sawaal" },
    { src: "/music/ranjha.mp3", name: "Ranjha" },
    { src: "/music/sahiba.mp3", name: "Sahiba" },
    { src: "/music/shayad.mp3", name: "shayad" },

    { src: "/music/lyrical_tum_jo_aaye.mp3", name: "lyrical_tum_jo_aaye" },
    { src: "/music/shaky.mp3", name: "Shaky" },
    { src: "/music/sunn-mere-yaar-ve.mp3", name: "Sunn Mere Yaar Ve" },
    { src: "/music/tere-liye.mp3", name: "Tere Liye" },
    { src: "/music/janam_janam.mp3", name: "janam janam" },

    { src: "/music/tum-ho-toh.mp3", name: "Tum Ho Toh" },
    { src: "/music/odia/sefali.mp3", name: "Sawaal" },
    { src: "/music/ambarsariya.mp3", name: "ambarsariya" },

    { src: "/music/aaj-se-teri.mp3", name: "Aaj Se Teri" },
    { src: "/music/arz-kiya-hai.mp3", name: "Arz Kiya Hai" },
    { src: "/music/danger-param-sundari.mp3", name: "Danger Param Sundari" },
    { src: "/music/deewaniyat.mp3", name: "Deewaniyat" },
    { src: "/music/ehsaas.mp3", name: "Ehsaas" },
    { src: "/music/raabta.mp3", name: "raabta" },

    { src: "/music/gehra-hua.mp3", name: "Gehra Hua" },
    { src: "/music/haule-haule.mp3", name: "Haule Haule" },
    { src: "/music/dil_ka_jo_haal_hai.mp3", name: "dil ka jo haal hai" },

    { src: "/music/ishqa-ve.mp3", name: "Ishqa Ve" },
    { src: "/music/ishq-bulaava.mp3", name: "Ishq Bulaava" },
    { src: "/music/janiye.mp3", name: "Janiye" },
    {
      src: "/music/lyrical_kabhi_kabhi_aditi_zindagi.mp3",
      name: "lyrical kabhi kabhi aditi zindagi",
    },
    { src: "/music/jugraafiya.mp3", name: "Jugraafiya" },
    { src: "/music/meri-zindagi-hai-tu.mp3", name: "Meri Zindagi Hai Tu" },
  ];

  const birthdaySong = [
    {
      src: "/music/janam_janam.mp3",
      name: "🎂 Happy Birthday My Love",
    },
  ];

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

    if (isPlaying) {
      audio.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const song = isBirthdayMode ? birthdaySong[0] : playlist[current];

    audio.src = song.src;
    audio.load();
    setProgress(0);
    setDuration(0);
  }, [current, isBirthdayMode]);

  useEffect(() => {
    if (unlocked) {
      setIsBirthdayMode(true);
      setIsPlaying(true);
    }
  }, [unlocked]);

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
    if (isBirthdayMode) {
      setTimeout(() => setIsBirthdayMode(false), 500);
    } else {
      setCurrent((prev) => (prev + 1) % playlist.length);
    }
  };

  const nextSong = () => {
    const audio = audioRef.current;
    if (audio) audio.pause();

    setIsBirthdayMode(false);
    setCurrent((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    const audio = audioRef.current;
    if (audio) audio.pause();

    setIsBirthdayMode(false);
    setCurrent((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentSong = isBirthdayMode
    ? birthdaySong[0].name
    : playlist[current].name;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-99 shadow-2xl text-white">
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleEnded}
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current.play().catch(() => {});
          }
        }}
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
          onClick={togglePlay}
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
          max={duration || 1}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-pink-500 cursor-pointer"
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}