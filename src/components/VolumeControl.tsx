import React from "react";
import { IoVolumeHighOutline, IoVolumeLowOutline } from "react-icons/io5";
import styled from "styled-components";
import { useAudioPlayerContext } from "../context/audio-player-context";


const Progress = styled.input<{$audioref :React.RefObject<HTMLAudioElement> }>`
--background: #dad9d9;
--main: #272827;
--secondary: #232323;

--bar-bg: var(--background);
--seek-before-width: ${props=>props.$audioref.current
  ? (props.$audioref.current?.volume) * 100 + "%"
  : 0};
--seek-before-color: var(--main);
--knobby: var(var(--main));
--selected-knobby: var(var(--secondary));

position: relative;
appearance: none;
background: var(--bar-bg);
height: 5px;
margin: auto 0;
width: 33.33%;
outline: none;
transition: all 2s ease-in-out;

/* progress bar style for safari */
&::-webkit-slider-runnable-track {
  background: var(--bar-bg);
  height: 4px;
  margin: auto 0;
  width: 20%;
  cursor: pointer;
  outline: none;
}

&::-moz-range-track {
  background: var(--bar-bg);
  height: 4px;
  margin: auto 0;
  outline: none;
}

&::-moz-focus-outer {
  border: 0;
}

&::before {
  content: "";
  height: 4px;
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
  height: 4px;
  width: 100%;
}

&::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: var(--main);
  border: none;
  cursor: pointer;
  position: relative;
  margin: -3px 0 0 0;
  z-index: 3;
}

&:active::-webkit-slider-thumb {
  transform: scale(1.2);
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
const VolumeControl = () => {
  const {audioRef} = useAudioPlayerContext()
  return (
    <div className=" gap-3 text-2xl mx-auto hidden md:flex justify-center ">
      <IoVolumeLowOutline />
      <Progress $audioref={audioRef}/>
      <IoVolumeHighOutline />
    </div>
  );
};

export default VolumeControl;
