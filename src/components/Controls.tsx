import { FC, useRef } from "react";
import { useAudioPlayerContext } from "../context/audio-player-context";
import {
  BsFillFastForwardFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsRepeat,
  BsRepeat1,
} from "react-icons/bs";
import { IoPauseCircleOutline, IoPlayCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import { AudioPlayerOptions } from "./AudioPLayer";
import { ValidColor } from "../types/types";

const ControlsContainer = styled.div<{ $primaryColor?: string }>`
  display: flex;
  align-items: center;
  color: ${({ $primaryColor }) => $primaryColor || "inherit"};
  @media (min-width: 1000px) {
    gap: 1rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  background-color: transparent;
  color: inherit; /* Inherit text color */
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  @media (min-width: 1000px) {
    font-size: 1.5rem; /* Tailwind md:text-2xl */
  }
`;

const PlayPauseButton = styled(Button)`
  font-size: 1.875rem; /* Tailwind text-3xl */
  @media (min-width: 1000px) {
    font-size: 2.25rem; /* Tailwind md:text-4xl */
  }
`;

const RepeatButton = styled(Button)<{
  $active: boolean;
  $primaryColor: ValidColor;
}>`
  color: ${({ $active, $primaryColor }) =>
    $active ? $primaryColor : "inherit"};
`;
const ForwardRewindWrapper = styled.div`
  display: none; /* Hide by default */

  @media (min-width: 1000px) {
    display: flex; /* Show on larger screens */
  }
`;

const Controls: FC<AudioPlayerOptions> = ({ repeat, forward, theme }) => {
  const {
    audioRef,
    currentTrack,
    playPrev,
    playNext,
    FastForward,
    Rewind,
    repeatState,
    toggleRepeat,
    togglePlayButton,
    isPlaying,
  } = useAudioPlayerContext();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleFastForward = () => {
    if (!audioRef.current?.src) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(FastForward, 100);
  };

  const handleRewind = () => {
    if (!audioRef.current?.src) return;
    if (intervalRef.current) return;
    intervalRef.current = setInterval(Rewind, 100);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <ControlsContainer $primaryColor={theme?.primaryColor}>
      <audio ref={audioRef} src={currentTrack?.src} />
      <Button onClick={playPrev}>
        <BsSkipStartFill />
      </Button>
      {forward && (
        <ForwardRewindWrapper>
          <Button
            onMouseDown={handleRewind}
            onMouseUp={stopCounter}
            onMouseLeave={stopCounter}
          >
            <BsFillRewindFill />
          </Button>
        </ForwardRewindWrapper>
      )}
      <PlayPauseButton onClick={togglePlayButton}>
        {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
      </PlayPauseButton>
      {forward && (
        <Button
          onMouseDown={handleFastForward}
          onMouseUp={stopCounter}
          onMouseLeave={stopCounter}
        >
          <BsFillFastForwardFill />
        </Button>
      )}
      <Button onClick={playNext}>
        <BsSkipEndFill />
      </Button>
      {repeat && (
        <RepeatButton
          $primaryColor={theme?.primaryColor || "black"}
          onClick={toggleRepeat}
          $active={repeatState === "REPEAT" || repeatState === "REPEATCURRENT"}
        >
          {repeatState === "REPEATCURRENT" ? <BsRepeat1 /> : <BsRepeat />}
        </RepeatButton>
      )}
    </ControlsContainer>
  );
};

export default Controls;
