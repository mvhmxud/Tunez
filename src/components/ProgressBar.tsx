import React, { useEffect, useRef, useState } from "react";
import { useAudioPlayerContext } from "../context/audio-player-context";
import { formatTime } from "../utils/utils";
import styled from "styled-components";
import { ThemeOptions } from "../types/types";

const Progress = styled.input<{
  $progress: number;
  $darkMode: boolean;
  $theme?: ThemeOptions;
  $isLive: boolean;
}>`
  --background: ${(props) =>
    props.$theme?.progressbarbgColor
      ? props.$theme?.progressbarbgColor
      : "#dad9d9"};
  --main: ${(props) =>
    props.$theme?.primaryColor ? props.$theme?.primaryColor : "#6c6c6c"};
  --secondary: ${(props) =>
    props.$theme?.secondaryColor ? props.$theme?.secondaryColor : "#2a2a2a"};
  --darkbackground: ${(props) =>
    props.$theme?.progressbarDarkbgColor
      ? props.$theme?.progressbarDarkbgColor
      : "#2b2b2b"};
  --bar-bg: ${(props) =>
    props.$darkMode ? "var(--darkbackground)" : "var(--background)"};
  --seek-before-width: ${(props) =>
    props.$isLive ? "0%" : `${props.$progress}%`};
  --seek-before-color: var(--main);

  position: relative;
  appearance: none;
  background: var(--bar-bg);
  height: 5px;
  margin: auto 0;
  width: 33.33%;
  outline: none;
  opacity: ${(props) => (props.$isLive ? 0.5 : 1)};
  cursor: ${(props) => (props.$isLive ? "not-allowed" : "pointer")};

  /* progress bar style for safari */
  &::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    height: 5px;
    margin: auto 0;
    width: 20%;
    cursor: ${(props) => (props.$isLive ? "not-allowed" : "pointer")};
    outline: none;
  }

  &::-moz-range-track {
    background: var(--bar-bg);
    height: 5px;
    margin: auto 0;
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::before {
    content: "";
    height: 5px;
    width: var(--seek-before-width);
    background-color: var(--seek-before-color);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: ${(props) => (props.$isLive ? "not-allowed" : "pointer")};
  }

  &::-moz-range-progress {
    background-color: var(--seek-before-color);
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    height: 5px;
    width: 100%;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: var(--secondary);
    border: none;
    cursor: ${(props) => (props.$isLive ? "not-allowed" : "pointer")};
    position: relative;
    margin: -3px 0 0 0;
    z-index: 3;
    display: ${(props) => (props.$isLive ? "none" : "block")};
  }

  &:active::-webkit-slider-thumb {
    transform: ${(props) => (props.$isLive ? "none" : "scale(1.2)")};
    background-color: var(--secondary);
  }

  &::-moz-range-thumb {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: var(--main);
    border: transparent;
    cursor: ${(props) => (props.$isLive ? "not-allowed" : "pointer")};
    position: relative;
    z-index: 3;
    display: ${(props) => (props.$isLive ? "none" : "block")};
  }

  &:active::-moz-range-thumb {
    transform: ${(props) => (props.$isLive ? "none" : "scale(1.2)")};
  }
`;

const ProgressBar: React.FC<{ darkMode: boolean; theme?: ThemeOptions  }> = ({
  darkMode,
  theme,
}) => {
  const { audioRef, isLive } = useAudioPlayerContext();
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const progressRef = useRef<HTMLInputElement | null>(null);

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
  }, [audioRef.current?.src]);

  const handleSetCurrentTime = () => {
    if (audioRef.current?.src) {
      audioRef.current.currentTime =
        (Number(progressRef.current?.value) / 100) * audioRef.current.duration;
    }
  };
  let progress;
  if (audioRef.current) {
    progress =
      audioRef.current.duration > 0
        ? (audioRef.current.currentTime / audioRef.current.duration) * 100
        : 0;
  }

  return (
    <div className="flex items-center justify-center gap-5 w-full">
      <span>{currentTime ? currentTime : "00:00"}</span>
      <Progress
        $progress={progress || 0}
        $isLive={isLive}
        $theme={theme}
        $darkMode={darkMode}
        ref={progressRef}
        disabled={isLive}
        onChange={handleSetCurrentTime}
        value={progress ? progress : 0}
        className="md:max-w-[80%]"
        type="range"
      />
       <span className="hidden md:block">{isLive ? "--:--" : duration}</span>
       <span className="block md:hidden">{isLive ? <span className="text-red-500">LIVE</span> : duration}</span>
    </div>
  );
};

export default ProgressBar;
