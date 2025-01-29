import "styled-components";

export type RepeatToggleStates = "NOREPEAT" | "REPEAT" | "REPEATCURRENT";
export type Themes = "Default" | "BLue" | "Green" | "Player222";

export interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}

export type ValidColor =
  | `#${string}` // Hex colors (e.g., #ccc, #ffffff)
  | `rgb(${number}, ${number}, ${number})` // RGB colors
  | `rgba(${number}, ${number}, ${number}, ${number})` // RGBA colors
  | "red"
  | "blue"
  | "green" // Named colors
  | "transparent" // Special keyword
  | "currentColor"; // CSS keyword

export interface ThemeOptions {
  primaryColor?: ValidColor;
  secondaryColor?: ValidColor;
  progressbarbgColor?: ValidColor;
  progressbarDarkbgColor?: ValidColor;
}
