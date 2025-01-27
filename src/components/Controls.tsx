import { useEffect, useRef, useState } from "react";
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



const Controls = () => {
  const {
    audioRef,
    currentTrack,
    setCurrentTrack,
    AddToQueue,
    playNext,
    playPrev,
    FastForward,
    Rewind,
    repeatState,
    toggleRepeat,
  } = useAudioPlayerContext();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

  const testSetTrack = (idx: number) => {
    AddToQueue(tracks[idx]);
    if (!audioRef.current?.src && !isPlaying) {
      setCurrentTrack(tracks[idx]);
      setIsPlaying(true);
    }
  };

  const handleFastForward = () => {
    if (!audioRef.current?.src) return;
    setIsPlaying(true);
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      FastForward();
    }, 100);
  };

  const handleRewind = () => {
    if (!audioRef.current?.src) return;
    setIsPlaying(true);
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

  return (
    <div className="flex  gap-4 items-center">
      <div className="absolute -top-10 flex gap-5 ">
        <button onClick={testSetTrack.bind(this, 0)}>Trinx</button>
        <button onClick={testSetTrack.bind(this, 2)}>Shahr 5</button>
        <button onClick={testSetTrack.bind(this, 1)}>1/4 Qarn</button>
      </div>
      <audio ref={audioRef} src={currentTrack?.src} />
      <button onClick={playPrev}>
        <BsSkipStartFill size={20} />
      </button>
      <button
        onMouseDown={handleRewind}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
      >
        <BsFillRewindFill size={20} />
      </button>
      <button
        onClick={() =>
         currentTrack ? setIsPlaying((prev) => !prev) : null
        }
      >
        {isPlaying ? (
          <BsFillPauseFill size={30} />
        ) : (
          <BsFillPlayFill size={30} />
        )}
      </button>
      <button
        onMouseDown={handleFastForward}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
      >
        <BsFillFastForwardFill size={20} />
      </button>
      <button onClick={playNext}>
        <BsSkipEndFill size={20} />
      </button>
      <button
        onClick={toggleRepeat}
        className={`${repeatState == "REPEAT" && "text-[#f50]"} ${
          repeatState == "REPEATCURRENT" && "text-[#f50]"
        } `}
      >
        {repeatState === "REPEATCURRENT" ? (
          <BsRepeat1 size={20} />
        ) : (
          <BsRepeat size={20} />
        )}
      </button>
      <div className="bg-red-800 absolute top-0"></div>
    </div>
  );
};

export default Controls;
