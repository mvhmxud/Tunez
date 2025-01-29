import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { RepeatToggleStates, Track } from "../types/types";
import { tracks } from "../data";

interface AudioPlayerContextType {
  currentTrack: Track | null;
  currentTrackIdx: number | null;
  setCurrentTrack: Dispatch<SetStateAction<Track>>;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  playTrack: (track: Track) => void;
  AddToQueue: (newTrack: Track) => void;
  RemoveFromQueue: (idx: number) => void;
  playNext: () => void;
  playPrev: () => void;
  FastForward: () => void;
  Rewind: () => void;
  togglePlayButton: () => void;
  tracksQueue: Track[] | null;
  repeatState: RepeatToggleStates;
  toggleRepeat: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(
  undefined
);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>();
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [tracksQueue, setTracksQueue] = useState<Track[] | []>([]);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [repeatState, setRePeatState] =
    useState<RepeatToggleStates>("NOREPEAT");

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsEnded(true);
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };
  }, [audioRef]);

  useEffect(() => {
    if (isEnded) {
      const isLastTrack = currentTrackIdx == tracksQueue.length - 1;
      switch (repeatState) {
        case "NOREPEAT":
          if (!isLastTrack) {
            playNext();
          }
          break;
        case "REPEAT":
          if (isLastTrack) {
            setCurrentTrack(tracksQueue[0]);
            setCurrentTrackIdx(0);
          } else {
            playNext();
          }
          break;
        case "REPEATCURRENT":
          audioRef.current?.play();
          break;
      }
      setIsEnded(false);
    }
  }, [isEnded]);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.src;
      setIsPlaying(true);
      const playAudio = () => {
        audioRef.current?.play().catch((err) => {
          console.error("Error playing audio:", err);
        });
      };
      audioRef.current.addEventListener("loadedmetadata", playAudio);
      return () => {
        audioRef.current?.removeEventListener("loadedmetadata", playAudio);
      };
    }
  }, [currentTrack, audioRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isPlaying, audioRef]);

  const AddToQueue = (newTrack: Track): void => {
    const isDuplicate = tracksQueue.some(
      (track) => track.title === newTrack.title
    );

    if (isDuplicate) {
      setTracksQueue((prev) => {
        const updatedQueue = [...prev].filter(
          (track) => track.title !== newTrack.title
        );
        updatedQueue.push(newTrack);
        return updatedQueue;
      });
    } else {
      setTracksQueue((prev) => [...prev, newTrack]);
    }
    if (!audioRef.current?.src && !isPlaying) {
      setCurrentTrack(newTrack);
      setIsPlaying(true);
    }
  };

  const emptyTracksQueue = () => {
    setTracksQueue([]);
    setCurrentTrack(null);
    setCurrentTrackIdx(0);
    if (audioRef.current) {
      audioRef.current.src = "";
      audioRef.current?.pause();
    }
  };

  const playTrack = (track: Track) => {
    if (currentTrack?.title != track.title) {
      emptyTracksQueue();
      AddToQueue(track);
      setCurrentTrack(track);
      setCurrentTrackIdx(0);
    }
  };
  const RemoveFromQueue = (idx: number) => {
    setTracksQueue((prev) => {
      const newQueue = [...prev];
      newQueue.splice(idx, 1);

      if (idx === currentTrackIdx) {
        if (tracksQueue.length == 1) {
          emptyTracksQueue();
        }
        playNext();
      }

      return newQueue;
    });
  };

  const playNext = () => {
    if (tracksQueue[currentTrackIdx + 1]) {
      setCurrentTrack(tracksQueue[currentTrackIdx + 1]);
      return setCurrentTrackIdx((prev) => prev + 1);
    }
  };

  const playPrev = () => {
    if (tracksQueue[currentTrackIdx - 1]) {
      setCurrentTrack(tracksQueue[currentTrackIdx - 1]);
      setCurrentTrackIdx((prev) => prev - 1);
    }
  };

  const FastForward = () => {
    if (audioRef.current?.src) {
      const currTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (currTime + 1 < duration) {
        audioRef.current.currentTime = audioRef.current?.currentTime + 1;
      }
    }
  };

  const toggleRepeat = () => {
    const states: RepeatToggleStates[] = [
      "NOREPEAT",
      "REPEAT",
      "REPEATCURRENT",
    ];
    setRePeatState((prev) => {
      const currentStateIdx = states.indexOf(prev);
      return states[(currentStateIdx + 1) % 3];
    });
  };

  const togglePlayButton = () => {
    if (currentTrack) {
      setIsPlaying((prev) => !prev);
    }
    return;
  };
  const Rewind = () => {
    if (audioRef.current?.src) {
      audioRef.current.currentTime = audioRef.current.currentTime - 1;
    }
  };

  const contextValue = {
    currentTrack,
    currentTrackIdx,
    setCurrentTrack,
    audioRef,
    tracksQueue,
    AddToQueue,
    RemoveFromQueue,
    playNext,
    playPrev,
    FastForward,
    Rewind,
    repeatState,
    toggleRepeat,
    togglePlayButton,
    playTrack,
    isPlaying,
  };
  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error(
      "useAudioPlayerContext must be used within an AudioPlayerProvider"
    );
  }
  return context;
};
