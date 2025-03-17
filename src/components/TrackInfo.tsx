"use client";

import type React from "react";
import { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useAudioPlayerContext } from "../context/audio-player-context";
import styled from "styled-components";

interface TrackInfoOptions {
  showThumbnail?: boolean;
  showAuthor?: boolean;
}

const TrackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  white-space: nowrap;
`;

const ThumbnailWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb; /* gray-200 */
  border-radius: 0.375rem;
  overflow: hidden;
  position: relative;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #d1d5db; /* gray-300 */
  border-radius: 0.375rem;
`;

const Image = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s;
  opacity: ${({ $loaded }) => ($loaded ? "1" : "0")};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d1d5db; /* gray-300 */
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

const InfoWrapper = styled.div`
  display: none;

  @media (min-width: 1000px) {
    display: block;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 200px; /* Set max width */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.p`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

const LiveBadge = styled.span`
  flex-shrink: 0; /* Prevents shrinking */
  font-size: 0.75rem;
  font-weight: normal;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #fee2e2; /* red-100 */
  color: #ef4444; /* red-500 */
`;

const Author = styled.p`
  font-size: 0.875rem;
  color: #9ca3af; /* gray-400 */
`;
const TrackInfo: React.FC<TrackInfoOptions> = ({
  showThumbnail = true,
  showAuthor = true,
}) => {
  const { currentTrack, isLive } = useAudioPlayerContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <TrackContainer>
      {showThumbnail && (
        <ThumbnailWrapper>
          {currentTrack?.thumbnail && !imageError ? (
            <>
              {!imageLoaded && (
                <LoadingOverlay>
                  <BsMusicNoteBeamed size="1.25rem" color="#4b5563" />
                </LoadingOverlay>
              )}
              <Image
                $loaded={imageLoaded}
                src={currentTrack.thumbnail || "/placeholder.svg"}
                alt={`${currentTrack.title} thumbnail`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <Placeholder>
              <BsMusicNoteBeamed size="1.25rem" color="#4b5563" />
            </Placeholder>
          )}
        </ThumbnailWrapper>
      )}

      <InfoWrapper>
        <TitleWrapper title={currentTrack?.title || "No track selected"}>
          <Title>{currentTrack?.title || "No track selected"}</Title>
          {isLive && <LiveBadge>LIVE</LiveBadge>}
        </TitleWrapper>
        {showAuthor && (
          <Author>{currentTrack?.author || "Unknown artist"}</Author>
        )}
      </InfoWrapper>
    </TrackContainer>
  );
};

export default TrackInfo;
