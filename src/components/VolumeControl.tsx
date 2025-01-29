import React, { useRef, useState, useEffect } from "react";
import { IoVolumeHighOutline, IoVolumeLowOutline } from "react-icons/io5";
import { useAudioPlayerContext } from "../context/audio-player-context";
import { ThemeOptions } from "../types/types";
import styled from "styled-components";

const Progress = styled.input<{
  $audioref: React.RefObject<HTMLAudioElement>;
  $darkMode: boolean;
  $theme: ThemeOptions;
}>`
  --background: ${(props) =>
    props.$theme?.progressbarbgColor
      ? props.$theme.progressbarbgColor
      : "#dad9d9"};
  --main: ${(props) =>
    props.$theme?.primaryColor ? props.$theme.primaryColor : "#6c6c6c"};
  --secondary: ${(props) =>
    props.$theme?.secondaryColor ? props.$theme.secondaryColor : "#2a2a2a"};
  --darkbackground: ${(props) =>
    props.$theme?.progressbarDarkbgColor
      ? props.$theme.progressbarDarkbgColor
      : "#2b2b2b"};
  --bar-bg: ${(props) =>
    props.$darkMode ? "var(--darkbackground)" : "var(--background)"};
  --seek-before-width: ${(props) =>
    props.$audioref.current
      ? (props.$audioref.current?.currentTime /
          props.$audioref.current?.duration) *
          100 +
        "%"
      : 0};
  --seek-before-color: var(--main);

  position: relative;
  appearance: none;
  background: var(--bar-bg);
  height: 5px;
  margin: auto 0;
  width: 33.33%;
  outline: none;

  /* progress bar style for safari */
  &::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    height: 5px;
    margin: auto 0;
    width: 20%;
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
    position: relative;
    margin: -3px 0 0 0;
    z-index: 3;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.2);
    background-color: var(--secondary);
  }

  &::-moz-range-thumb {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: var(--main);
    border: transparent;
    cursor: pointer;
    position: relative;
    z-index: 3;
  }

  &:active::-moz-range-thumb {
    transform: scale(1.2);
  }
`;

interface VolumeControlProps {
  darkMode?: boolean;
  theme?: ThemeOptions;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ darkMode, theme }) => {
  const { audioRef } = useAudioPlayerContext();
  const rangeRef = useRef<HTMLInputElement>(null);
  const [volume, setVolume] = useState(100); // Default volume is 100%

  useEffect(() => {
    if (audioRef.current) {
      setVolume(audioRef.current.volume * 100);
    }
  }, [audioRef]);

  const onChangeHandler = () => {
    if (audioRef.current && rangeRef.current) {
      const newVolume = Number(rangeRef.current.value) / 100;
      audioRef.current.volume = newVolume;
      setVolume(newVolume * 100); // Update the state
    }
  };

  return (
    <div className="gap-3 min-w-32 text-2xl mx-auto hidden md:flex justify-center items-center">
      <IoVolumeLowOutline />
      <Progress
      
        $audioref={audioRef}
        $darkMode={darkMode}
        $theme={theme}
        ref={rangeRef}
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onChangeHandler}
      />
      <IoVolumeHighOutline />
    </div>
  );
};

export default VolumeControl;
