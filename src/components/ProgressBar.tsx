import React, { useEffect, useState } from "react";
import { useAudioPlayerContext } from "../context/audio-player-context";
import { formatTime } from "../utils/utils";

const ProgressBar = () => {
  const { audioRef } = useAudioPlayerContext();
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio) {
        setCurrentTime(formatTime(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      if (audio && !isNaN(audio.duration)) {
        setDuration(formatTime(audio.duration));
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [audioRef.current?.src]); // Only re-run effect if `src` changes

  const handleSetCurrentTime = () => {
    if (audioRef.current?.src) {
      audioRef.current.currentTime = Number(150);
    }
  };
  
  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <span>{currentTime ? currentTime : "00:00"}</span>
      <input className="max-w-[80%] bg-gray-300" type="range" />
      <span>{duration ? duration : "00:00"}</span>
      <button className="hidden" onClick={handleSetCurrentTime}>click</button>
    </div>
  );
};

export default ProgressBar;
