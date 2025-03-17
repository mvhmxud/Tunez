import styled from "styled-components";
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import { ThemeOptions } from "../types/types";

export interface AudioPlayerOptions {
  showThumbnail?: boolean;
  showAuthor?: boolean;
  darkMode?: boolean;
  repeat?: boolean;
  forward?: boolean;
  volume?: boolean;
  theme?: ThemeOptions;
}

const PlayerContainer = styled.div<{
  $darkMode: boolean;
  theme?: ThemeOptions;
}>`
  min-height: 5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: ${({ $darkMode }) => ($darkMode ? "#f8fafc" : "#71717a")};
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  z-index: 10;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${({ $darkMode, theme }) =>
    $darkMode
      ? theme?.darkContainerBg || "#0f0f0f"
      : theme?.containerBg || "#f9f9f9"};

  @media (min-width: 768px) {
    gap: 2.25rem;
  }
`;

export const AudioPlayer: React.FC<AudioPlayerOptions> = ({
  theme,
  forward = false,
  showAuthor = false,
  showThumbnail = false,
  repeat = false,
  volume = false,
  darkMode = false,
}) => {
  return (
    <PlayerContainer $darkMode={darkMode} theme={theme}>
      <TrackInfo showThumbnail={showThumbnail} showAuthor={showAuthor} />
      <Controls theme={theme} forward={forward} repeat={repeat} />
      <ProgressBar theme={theme} darkMode={darkMode} />
      {volume && <VolumeControl darkMode={darkMode} theme={theme} />}
    </PlayerContainer>
  );
};
