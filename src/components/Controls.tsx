import { FC, useEffect, useRef, useState } from "react";
import { useAudioPlayerContext } from "../context/audio-player-context";
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsRepeat,
  BsRepeat1,
} from "react-icons/bs";
import { tracks } from "../data";
import { AudioPlayerOptions } from "./AudioPLayer";

const Controls : FC<AudioPlayerOptions> = ({repeat , forward}) => {
  const {
    audioRef,
    currentTrack,
    AddToQueue,
    playTrack,
    playNext,
    playPrev,
    FastForward,
    Rewind,
    repeatState,
    toggleRepeat,
    togglePlayButton,
    isPlaying
  } = useAudioPlayerContext();
  const intervalRef = useRef<number | null>(null);

  const testSetTrack = (idx: number) => {
    playTrack(tracks[idx]);
  };

  const handleAddToQueue = (idx: number) => {
    AddToQueue(tracks[idx]);
  };

  const handleFastForward = () => {
    if (!audioRef.current?.src) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      FastForward();
    }, 100);
  };

  const handleRewind = () => {
    if (!audioRef.current?.src) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      Rewind();
    }, 100);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  useEffect(()=>{
    console.log("controls",isPlaying)
  },[isPlaying])

  return (
    <div className="flex gap-4 items-center">
      <div className="absolute -top-10 flex md:gap-5 ">
        <button onClick={testSetTrack.bind(this, 0)}>Trinx</button>
        <button onClick={testSetTrack.bind(this, 2)}>Shahr 5</button>
        <button onClick={handleAddToQueue.bind(this, 1)}>1/4 Qarn</button>
      </div>
      <audio ref={audioRef} src={currentTrack?.src} />
      <button onClick={playPrev}>
        <BsSkipStartFill className="text-xl md:text-3xl" />
      </button>
      {forward && <button
        onMouseDown={handleRewind}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
      >
        <BsFillRewindFill className="text-xl md:text-3xl" />
      </button>}
      <button onClick={togglePlayButton}>
        {isPlaying ? (
          <BsFillPauseFill className="text-xl md:text-3xl" />
        ) : (
          <BsFillPlayFill className="text-xl md:text-3xl" />
        )}
      </button>
      {forward && <button
        onMouseDown={handleFastForward}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
      >
        <BsFillFastForwardFill className="text-xl md:text-3xl" />
      </button>}
      <button onClick={playNext}>
        <BsSkipEndFill className="text-xl md:text-3xl" />
      </button>
     {repeat &&  <button
        onClick={toggleRepeat}
        className={`${repeatState == "REPEAT" && "text-[#f50]"} ${
          repeatState == "REPEATCURRENT" && "text-[#f50]"
        } `}
      >
        {repeatState === "REPEATCURRENT" ? (
          <BsRepeat1 className="text-xl md:text-3xl" />
        ) : (
          <BsRepeat className="text-xl md:text-3xl" />
        )}
      </button>}
      <div className="bg-red-800 absolute top-0"></div>
    </div>
  );
};

export default Controls;
