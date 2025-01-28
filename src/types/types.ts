import "styled-components";

export type RepeatToggleStates = "NOREPEAT" | "REPEAT" | "REPEATCURRENT";
export type Themes = "Default" | "BLue" | "Green" | "Player222";

export interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}

