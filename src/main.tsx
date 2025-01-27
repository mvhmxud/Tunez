import { createRoot } from "react-dom/client";
import "./styles/index.css";
import './styles/progress-bar.css';
import App from "./App.tsx";
import { AudioPlayerProvider } from "./context/audio-player-context.tsx";

createRoot(document.getElementById("root")!).render(
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
);
