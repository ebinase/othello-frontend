import { gameStatusSlector } from '@dataflow/game/gameStatusSlector';
import { othelloSelector } from '@dataflow/othelloAtom';
import { atom } from 'jotai';
import { analyzedPlayersSlector } from './analyzedPlayersSlector';

export const activePlayersSlector = atom((get) => {
  if (get(gameStatusSlector) === "finished") {
    return null;
  }

  const activeColor = get(othelloSelector).color
  const players = get(analyzedPlayersSlector);
  return players[activeColor];
});