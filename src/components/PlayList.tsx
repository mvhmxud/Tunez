import { useAudioPlayerContext } from "../context/audio-player-context";

function PlayList() {
  const { tracksQueue , RemoveFromQueue } = useAudioPlayerContext();
  return <>
  
  {tracksQueue?.length > 0 ? tracksQueue?.map((track , idx) => (
    <div key={idx} onClick={()=>RemoveFromQueue(idx)}>{track.title}</div>
  )) : ''}</>;
}

export default PlayList;
