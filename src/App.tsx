import { AudioPlayer } from "./components/AudioPLayer";

function App() {
  return (
    <div className="h-[100vh]">
      <AudioPlayer
       
        forward={true}
        showAuthor={true}
        showThumbnail={true}
        repeat={true}
        darkMode={true}
      />
    </div>
  );
}

export default App;
