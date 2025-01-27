import React from "react";
import { useAudioPlayerContext } from "../context/audio-player-context";

function PlayList() {
  const { tracksQueue , RemoveFromQueue } = useAudioPlayerContext();
  return <>
  
  {tracksQueue?.length > 0 ? tracksQueue?.map((track , idx) => (
    <div onClick={RemoveFromQueue.bind(this,idx)}>{track.title}</div>
  )) : ''}</>;
}

export default PlayList;
