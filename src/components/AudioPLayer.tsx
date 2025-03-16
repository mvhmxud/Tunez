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
    <section className={darkMode ? "dark" : ""}>
      <div
        className="min-h-20 dark:bg-zinc-950 drop-shadow-sm text-zinc-500 dark:text-slate-50 rounded-t-md fixed bottom-0 w-[100vw] flex gap-3 md:gap-9 lg:flex-row justify-between items-center px-4 py-2"
        style={{ backgroundColor: darkMode ? theme?.darkContainerBg :  theme?.containerBg  }}
      >
        <TrackInfo showThumbnail={showThumbnail} showAuthor={showAuthor} />
        <Controls theme={theme} forward={forward} repeat={repeat} />
        <ProgressBar theme={theme} darkMode={darkMode} />
        {volume ? <VolumeControl darkMode={darkMode} theme={theme} /> : ""}
      </div>
    </section>
  );
};
