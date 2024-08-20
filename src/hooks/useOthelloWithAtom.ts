import { gameModeSelector } from "@dataflow/game/gameModeSelector";
import { gameResultSelector } from "@dataflow/game/gameResultSelector";
import {
  gameInitializeExecutor,
  gameRestartExecutor,
  gameStartExecutor,
  gameStatusSelector,
} from "@dataflow/gameStatusAtom";
import { messageSelector, messageUpdateExecutor } from "@dataflow/messageAtom";
import {
  othelloSelector,
  othelloSkipExecutor,
  othelloUpdateExecutor,
  type SkipExecutor,
  type UpdateExecutor,
} from "@dataflow/othelloAtom";
import {
  ActivePlayer,
  activePlayerSelector,
} from "@dataflow/player/activePlayerSelector";
import { analyzedPlayersSelector } from "@dataflow/player/analyzedPlayersSelector";
import { buildPlayers } from "@dataflow/playersAtom";
import { COLOR_CODE } from "@models/Board/Color";
import { BOT_CONFIG, resolveBotMethod } from "@models/Bot/BotList";
import { buildBotPlayer, buildHumanPlayer, Player } from "@models/Player/Player";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

const useOthello = () => {
  const othelloValues = useAtomValue(othelloSelector);
  const players = useAtomValue(analyzedPlayersSelector);
  const activePlayer = useAtomValue(activePlayerSelector);
  const update = useSetAtom(othelloUpdateExecutor);
  const skip = useSetAtom(othelloSkipExecutor);
  const startGame = useSetAtom(gameStartExecutor);

  return {
    board: othelloValues.board,
    game: {
      status: useAtomValue(gameStatusSelector),
      mode: useAtomValue(gameModeSelector),
      result: useAtomValue(gameResultSelector),
      start: useCallback(
        (white: Player, black: Player) => {
          startGame(buildPlayers()(white)(black));
        },
        [startGame]
      ),
      reset: useSetAtom(gameInitializeExecutor),
      restart: useSetAtom(gameRestartExecutor),
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
    // Botに限らず、ゲームを進行させるためのメソッド。useEffect内で呼び出すことを想定
    activateGame: useCallback(() => {
      // Botが行動可能な状態であればBotを起動
      if (activePlayer.type === 'bot' && activePlayer.action === 'update') {
        const method = resolveBotMethod(activePlayer.level);
        const move = method(othelloValues.board, activePlayer.color);
        if (move !== null) {
          update(move);
        } else {
          skip();
        }
      }
    }, [activePlayer, othelloValues.board, update, skip]),
    // そのターン中のみ有効なメッセージを表示
    showMessage: useSetAtom(messageUpdateExecutor),
    message: useAtomValue(messageSelector),
    assets: {
      bot: {
        list: BOT_CONFIG,
        buildHumanPlayer,
        buildBotPlayer,
      },
    },
  };
};

export default useOthello;

const resolveAction = (
  action: ActivePlayer["action"],
  update: UpdateExecutor,
  skip: SkipExecutor
) => {
  switch (action) {
    case "update":
      return { type: action, update } as {
        type: "update";
        update: typeof update;
      };
    case "skip":
      return { type: action, skip } as { type: "skip"; skip: typeof skip };
    case "none":
      return { type: action } as { type: "none" };
  }
};
