import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const SpotifyClone = () => {
  const [songs, setSongs] = useState([]);
  const [playingSong, setPlayingSong] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get(" https://project-gyan-backend.vercel.app/api/songs")
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const playSong = (song) => {
    if (playingSong?.id === song.id) {
      audioRef.current.pause();
      setPlayingSong(null);
    } else {
      setPlayingSong(song);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = song.url;
          audioRef.current
            .play()
            .catch((err) => console.error("Playback error:", err));
        }
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          🎵 My Music Player
        </h1>
      </header>

      {/* Song List */}
      <main className="flex-1 overflow-y-auto px-4 md:px-6">
        <ul className="space-y-3 md:space-y-4">
          {songs.map((song) => (
            <li
              key={song.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-700 ${
                playingSong?.id === song.id ? "bg-gray-800" : ""
              }`}
              onClick={() => playSong(song)}
            >
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-sm md:text-base">
                  {song.name}
                </p>
              </div>
              <button className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm md:text-base">
                {playingSong?.id === song.id ? "Pause" : "Play"}
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* Now Playing (Sticky Bottom) */}
      {playingSong && (
        <AudioPlayer playingSong={playingSong.url} audioRef={audioRef} />
      )}
    </div>
  );
};

const AudioPlayer = ({ playingSong, audioRef }) => {
  return (
    <div className="sticky bottom-0 w-full bg-gray-800 p-4 md:p-6 shadow-lg">
      <h2 className="text-base md:text-lg font-semibold">🎶 Now Playing</h2>
      {playingSong ? (
        <audio ref={audioRef} controls className="w-full mt-2" />
      ) : (
        <p className="text-gray-400 text-sm">No song selected</p>
      )}
    </div>
  );
};

export default SpotifyClone;
