import { othelloSelector } from '@dataflow/othelloAtom';
import { Othello } from '@models/Game/Othello';
import { atom } from 'jotai';

type GameStatus = "playing" | "finished"

export const gameStatusSlector = atom<GameStatus>((get) => {
  const game = Othello.reconstruct(get(othelloSelector));
  return game.isOver() ? "finished" : "playing"
});