import { gameModeSelector } from '@dataflow/game/gameModeSelector';
import { gameResultSelector } from '@dataflow/game/gameResultSlector';
import { gameStatusSlector } from '@dataflow/game/gameStatusSlector';
import {
  othelloInitializeExecutor,
  othelloSelector,
  othelloSkipExecutor,
  othelloUpdateExecutor,
  type SkipExecutor,
  type UpdateExecutor,
} from '@dataflow/othelloAtom';
import {
  ActivePlayer,
  activePlayerSlector,
} from '@dataflow/player/activePlayerSlector';
import { analyzedPlayersSlector } from '@dataflow/player/analyzedPlayersSlector';
import { buildPlayers, playersInitializeExecutor } from '@dataflow/playersAtom';
import { COLOR_CODE } from '@models/Board/Color';
import { Player } from '@models/Player/Player';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

const useOthello = () => {
  const othelloValues = useAtomValue(othelloSelector);
  const players = useAtomValue(analyzedPlayersSlector);
  const activePlayer = useAtomValue(activePlayerSlector);
  const update = useSetAtom(othelloUpdateExecutor);
  const skip = useSetAtom(othelloSkipExecutor);
  const gameInitializer = useSetAtom(othelloInitializeExecutor);
  const playerInitializer = useSetAtom(playersInitializeExecutor);

  return {
    board: othelloValues.board,
    game: {
      status: useAtomValue(gameStatusSlector),
      mode: useAtomValue(gameModeSelector),
      result: useAtomValue(gameResultSelector),
      initialize: (white: Player, black: Player) => {
        gameInitializer();
        playerInitializer(buildPlayers()(white)(black));
      },
      reset: useCallback(() => {
        gameInitializer();
        playerInitializer();
      }, [gameInitializer, playerInitializer]),
      restart: useCallback(() => {
        gameInitializer();
      }, [gameInitializer]),
    },
    players: {
      ...players,
      white: players[COLOR_CODE.WHITE], // エイリアス
      black: players[COLOR_CODE.BLACK], // エイリアス
      active: {
        ...activePlayer,
        action: {
          ...resolveAction(activePlayer.action, update, skip),
        },
      },
    },
  };
};

export default useOthello;

const resolveAction = (
  action: ActivePlayer['action'],
  update: UpdateExecutor,
  skip: SkipExecutor
) => {
  switch (action) {
    case 'update':
      return { type: action, update } as {
        type: 'update';
        update: typeof update;
      };
    case 'skip':
      return { type: action, skip } as { type: 'skip'; skip: typeof skip };
    case 'none':
      return { type: action } as { type: 'none' };
  }
};
