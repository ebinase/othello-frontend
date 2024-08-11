import { gameModeSelector } from '@dataflow/game/gameModeSelector';
import { gameResultSelector } from '@dataflow/game/gameResultSlector';
import { gameInitializeExecutor, gameRestartExecutor, gameStartExecutor, gameStatusSelector } from '@dataflow/gameStatusAtom';
import {
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
import { buildPlayers } from '@dataflow/playersAtom';
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
  const initializeGame = useSetAtom(gameInitializeExecutor);
  const startGame = useSetAtom(gameStartExecutor);
  const restartGame = useSetAtom(gameRestartExecutor);

  return {
    board: othelloValues.board,
    game: {
      status: useAtomValue(gameStatusSelector),
      mode: useAtomValue(gameModeSelector),
      result: useAtomValue(gameResultSelector),
      start: (white: Player, black: Player) => {
        startGame(buildPlayers()(white)(black));
      },
      reset: useCallback(() => {
        initializeGame();
      }, [initializeGame]),
      restart: useCallback(() => {
        restartGame();
      }, [restartGame]),
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
