import { AudioPlayer } from "./components/AudioPLayer";
import { AudioPlayerProvider } from "./context/audio-player-context";

function App() {
  return (
    <div className="bg-black  h-[100vh]">
      <AudioPlayerProvider>
        <AudioPlayer theme="Default" forward={true} showAuthor={true} showThumbnail={true} repeat={true}  />
      </AudioPlayerProvider>
    </div>
  );
}

export default App;
