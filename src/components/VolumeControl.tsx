import type React from "react"

import { useRef } from "react"
import { IoVolumeHighOutline, IoVolumeLowOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { useAudioPlayerContext } from "../context/audio-player-context"
import type { ThemeOptions } from "../types/types"
import styled from "styled-components"

const VolumeSlider = styled.input<{
  $volume: number
  $darkMode: boolean
  $theme: ThemeOptions
}>`
  --background: ${(props) => props.$theme?.progressbarbgColor || "#dad9d9"};
  --main: ${(props) => props.$theme?.primaryColor || "#6c6c6c"};
  --secondary: ${(props) => props.$theme?.secondaryColor || "#2a2a2a"};
  --darkbackground: ${(props) => props.$theme?.progressbarDarkbgColor || "#2b2b2b"};
  --bar-bg: ${(props) => (props.$darkMode ? "var(--darkbackground)" : "var(--background)")};
  --seek-before-width: ${(props) => `${props.$volume * 100}%`};
  --seek-before-color: var(--main);

  position: relative;
  appearance: none;
  background: var(--bar-bg);
  height: 5px;
  margin: auto 0;
  width: 100%;
  outline: none;
  opacity: 1;
  cursor: pointer;

  /* Progress bar style for Safari */
  &::-webkit-slider-runnable-track {
    background: var(--bar-bg);
    height: 5px;
    margin: auto 0;
    width: 100%;
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
    display: block;
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
    display: block;
  }

  &:active::-moz-range-thumb {
    transform: scale(1.2);
  }
`


interface VolumeControlProps {
  darkMode?: boolean
  theme?: ThemeOptions
}

const VolumeControl: React.FC<VolumeControlProps> = ({ darkMode = false, theme = {} }) => {
  const { volume, setVolume } = useAudioPlayerContext()
  const rangeRef = useRef<HTMLInputElement>(null)

  const onChangeHandler = () => {
    if (rangeRef.current) {
      const newVolume = Number(rangeRef.current.value) / 100
      setVolume(newVolume)
    }
  }

  const VolumeIcon = () => {
    if (volume === 0) return <IoVolumeMuteOutline />
    if (volume < 0.5) return <IoVolumeLowOutline />
    return <IoVolumeHighOutline />
  }

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0)
    } else {
      setVolume(1)
    }
  }

  return (
    <div
      className={`gap-3 min-w-32 text-2xl mx-auto hidden md:flex justify-center items-center `}
    >
      <button onClick={toggleMute} className="hover:text-primary transition-colors">
        <VolumeIcon />
      </button>
      <VolumeSlider
        $volume={volume}
        $darkMode={darkMode}
        $theme={theme}
        ref={rangeRef}
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={onChangeHandler}
        className="w-24"
      />
    </div>
  )
}

export default VolumeControl

