import { playersSelector } from "@dataflow/playersAtom";
import { atom } from "jotai";

export type GameMode = "PVP" | "PVE";

export const gameModeSelector = atom<GameMode>((get) => {
  const players = get(playersSelector);
  return Object.values(players).every((player) => player.type === "human")
    ? "PVP"
    : "PVE";
});
