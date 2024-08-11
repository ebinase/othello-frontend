import { gameResultSelector } from '@dataflow/game/gameResultSlector';
import { gameStatusSlector } from '@dataflow/game/gameStatusSlector';
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
import { COLOR_CODE } from '@models/Board/Color';
import { useAtomValue, useSetAtom } from 'jotai';

const useOthello = () => {
  const othelloValues = useAtomValue(othelloSelector);
  const players = useAtomValue(analyzedPlayersSlector);
  const activePlayer = useAtomValue(activePlayerSlector);
  const update = useSetAtom(othelloUpdateExecutor);
  const skip = useSetAtom(othelloSkipExecutor);

  return {
    board: othelloValues.board,
    game: {
      status: useAtomValue(gameStatusSlector),
      result: useAtomValue(gameResultSelector),
    },
    players: {
      white: players[COLOR_CODE.WHITE],
      black: players[COLOR_CODE.BLACK],
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
