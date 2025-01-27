import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import PlayList from "./PlayList";

export const AudioPlayer = () => {
  
  return (
    <div>
      <div className="min-h-8 bg-zinc-50 drop-shadow-sm text-zinc-500 rounded-t-md absolute bottom-0 w-[100vw] flex flex-col gap-9 lg:flex-row justify-between items-center px-4 py-2">
        <TrackInfo />
          <Controls />
          <ProgressBar />
          <VolumeControl />
      </div>
      <PlayList/>
    </div>
  );
};
