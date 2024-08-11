
import { othelloSelector } from '@dataflow/othelloAtom';
import { atom } from 'jotai';
import { match } from 'ts-pattern';
import {
  AnalyzedPlayers,
  analyzedPlayersSlector,
} from './analyzedPlayersSlector';
import { GameStatus, gameStatusSelector } from '@dataflow/gameStatusAtom';

export type ActivePlayer = AnalyzedPlayers[keyof AnalyzedPlayers] & {
  action: 'update' | 'skip' | 'none';
};

export const activePlayerSlector = atom<ActivePlayer>((get) => {
  const activeColor = get(othelloSelector).color;
  const players = get(analyzedPlayersSlector);
  const gameStatus = get(gameStatusSelector);
  return {
    ...players[activeColor],
    action: match<GameStatus, ActivePlayer['action']>(gameStatus)
      .with('not_started', () => 'none')
      .with('playing', () =>
        players[activeColor].selectable.length === 0 ? 'skip' : 'update'
      )
      .with('finished', () => 'none')
      .exhaustive(),
  };
});
