export type RepeatToggleStates = "NOREPEAT" | "REPEAT" | "REPEATCURRENT";
export interface Track {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}
