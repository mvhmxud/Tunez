import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PlayList from "./PlayList";
import { Themes } from "../types/types";

export interface AudioPlayerOptions {
  showThumbnail?: boolean;
  showAuthor?: boolean;
  repeat?: boolean;
  forward?: boolean;
  volume?: boolean;
  theme: Themes;
}

export const AudioPlayer: React.FC<AudioPlayerOptions> = ({theme="Default",forward=true,showAuthor=true,showThumbnail=true,repeat=true,volume=true}) => {
  return (
    <div>
      <div className="min-h-8 bg-zinc-50 drop-shadow-sm text-zinc-500 rounded-t-md absolute bottom-0 w-[100vw] flex  gap-3 md:gap-9 lg:flex-row justify-between items-center px-4 py-2">
        <TrackInfo showThumbnail={showThumbnail} showAuthor={showAuthor} />
        <Controls
          theme={theme}
          forward={forward}
          repeat={repeat}
        />
        <ProgressBar />
        {volume && <VolumeControl />}
      </div>
      <PlayList />
    </div>
  );
};
