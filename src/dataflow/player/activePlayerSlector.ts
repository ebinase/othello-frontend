import { gameStatusSlector } from '@dataflow/game/gameStatusSlector';
import { othelloSelector } from '@dataflow/othelloAtom';
import { Othello } from '@models/Game/Othello';
import { atom } from 'jotai';
import { analyzedPlayersSlector } from './analyzedPlayersSlector';

export const activePlayerSlector = atom((get) => {
  if (get(gameStatusSlector) === "finished") {
    return null;
  }

  const activeColor = get(othelloSelector).color
  const players = get(analyzedPlayersSlector);
  const game = Othello.reconstruct(get(othelloSelector));
  return {
    ...players[activeColor],
    action: game.shoudSkip() ? "skip" : "update" as "update" | "skip", // そのターンに実行可能なアクション
  }
});