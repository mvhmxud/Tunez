import { AudioPlayer } from "./components/AudioPLayer";
import { AudioPlayerProvider } from "./context/audio-player-context";

function App() {
  return (
      <AudioPlayerProvider>
        <AudioPlayer forward showAuthor showThumbnail repeat  volume />
      </AudioPlayerProvider>
  );
}

export default App;
