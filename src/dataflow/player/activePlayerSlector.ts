import { gameStatusSlector } from '@dataflow/game/gameStatusSlector';
import { othelloSelector } from '@dataflow/othelloAtom';
import { Othello } from '@models/Game/Othello';
import { atom } from 'jotai';
import { AnalyzedPlayers, analyzedPlayersSlector } from './analyzedPlayersSlector';

type ActivePlayer = AnalyzedPlayers[keyof AnalyzedPlayers] & {
  action: "update" | "skip";
} | null;

export const activePlayerSlector = atom<ActivePlayer>((get) => {
  if (get(gameStatusSlector) === "finished") {
    return null;
  }

  const activeColor = get(othelloSelector).color
  const players = get(analyzedPlayersSlector);
  const game = Othello.reconstruct(get(othelloSelector));
  return {
    ...players[activeColor],
    action: game.shoudSkip() ? "skip" : "update", // そのターンに実行可能なアクション
  }
});