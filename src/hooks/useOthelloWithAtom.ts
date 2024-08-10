import { gameResultSelector } from '@dataflow/game/gameResultSlector';
import { gameStatusSlector } from '@dataflow/game/gameStatusSlector';
import {
  othelloSelector,
  othelloSkipExecutor,
  othelloUpdateExecutor,
} from '@dataflow/othelloAtom';
import { activePlayerSlector } from '@dataflow/player/activePlayerSlector';
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
      active: !!activePlayer
        ? {
          ...activePlayer,
          action:
              activePlayer.action === 'update'
                ? {
                    type: activePlayer.action,
                    update,
                  }
                : { type: activePlayer.action, skip },
          }
        : null,
    },
  };
};

export default useOthello;
