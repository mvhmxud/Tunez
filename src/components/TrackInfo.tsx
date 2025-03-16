"use client"

import type React from "react"

import { useState } from "react"
import { BsMusicNoteBeamed } from "react-icons/bs"
import { useAudioPlayerContext } from "../context/audio-player-context"

interface TrackInfoOptions {
  showThumbnail?: boolean
  showAuthor?: boolean
}

const TrackInfo: React.FC<TrackInfoOptions> = ({ showThumbnail = true, showAuthor = true }) => {
  const { currentTrack, isLive } = useAudioPlayerContext()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="flex text-nowrap items-center gap-4">
      {showThumbnail && (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
          {currentTrack?.thumbnail && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 animate-pulse">
                  <BsMusicNoteBeamed className="text-xl text-gray-600" />
                </div>
              )}
              <img
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={currentTrack.thumbnail || "/placeholder.svg"}
                alt={`${currentTrack.title} thumbnail`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
              <span className="text-xl text-gray-600">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="hidden md:block">
        <p className="font-bold lg:truncate">
          {currentTrack?.title || "No track selected"}
          {isLive && <span className="ml-2 text-red-500 text-xs font-normal px-1 py-0.5 rounded bg-red-100">LIVE</span>}
        </p>
        {showAuthor && <p className="text-sm text-gray-400">{currentTrack?.author || "Unknown artist"}</p>}
      </div>
    </div>
  )
}

export default TrackInfo

