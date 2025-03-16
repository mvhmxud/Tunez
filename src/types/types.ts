export type RepeatToggleStates = "NOREPEAT" | "REPEAT" | "REPEATCURRENT"

export interface Track {
  title: string
  src: string
  author: string
  thumbnail?: string
}

export type ValidColor =
  | `#${string}` 
  | `rgb(${number}, ${number}, ${number})` 
  | `rgba(${number}, ${number}, ${number}, ${number})` 
  | string 

export interface ThemeOptions {
  primaryColor?: ValidColor
  secondaryColor?: ValidColor
  progressbarbgColor?: ValidColor
  progressbarDarkbgColor?: ValidColor
  containerBg ? : ValidColor
  darkContainerBg ? : ValidColor
}

export interface AudioPlayerState {
  currentTrack: Track | null
  currentTrackIdx: number | null
  isPlaying: boolean
  isLive: boolean
  isLoading: boolean
  tracksQueue: Track[]
  repeatState: RepeatToggleStates
  volume: number
  duration: number
  currentTime: number
}

export interface AudioPlayerOptions {
  showThumbnail?: boolean
  showAuthor?: boolean
  darkMode?: boolean
  repeat?: boolean
  forward?: boolean
  volume?: boolean
  theme?: ThemeOptions
  initialTrack?: Track
  autoPlay?: boolean
}

export type AudioPlayerStatus = "idle" | "loading" | "playing" | "paused" | "error"

