import { BoardData, FieldId } from "@models/Board/Board";
import { create } from "zustand";
import { COLOR_CODE } from "@models/Board/Color";
import { othelloReducer } from "../models/Game/othelloReducer";
import { createMetaData, MetaData } from "../util/metadata";
import { Othello } from "@models/Game/Othello";
import { BotLevel, resolveBotMethod } from "@models/Bot/BotList";
import { COMPARISON_RESULT } from "@models/Shared/Comparison";

type Player = {
  name: string;
  type: "human" | "bot";
  think: undefined | ((board: BoardData, color: COLOR_CODE) => FieldId | null);
};

type Players = {
  [COLOR_CODE.WHITE]: Player;
  [COLOR_CODE.BLACK]: Player;
  active: Player;
};

const initPlayer = (name: string): Player => {
  return {
    name,
    type: "human",
    think: undefined,
  };
};

const initBot = (botLevel: BotLevel): Player => {
  const think = resolveBotMethod(botLevel);
  return {
    name: "Bot Lv." + botLevel,
    type: "bot",
    think,
  };
};

const initialPlayers: Players = {
  [COLOR_CODE.WHITE]: initPlayer("WHITE"),
  [COLOR_CODE.BLACK]: initPlayer("BLACK"),
  active: initPlayer("WHITE"),
};

type OthelloState = {
  isOver: boolean;
  skipCount: number;
  turn: number;
  board: BoardData;
  color: COLOR_CODE;
  shouldSkip: boolean;
  meta: MetaData;
};

// TODO: Storeの定義をリファクタする際に適切な型に分割する
type TempState = OthelloState & {
  error?: {
    hasError: boolean;
    message?: any;
    data?: any;
  };
};

const initializedOthello = Othello.initialize();
const initialState: TempState = {
  ...initializedOthello.toArray(),
  meta: createMetaData(initializedOthello.board, initializedOthello.color),
};

export enum GAME_MODE {
  PVP = "PVP",
  PVE = "PVE",
}

export type PvPSettings = {
  gameMode: GAME_MODE.PVP;
  players: string[];
};

export type PvESettings = {
  gameMode: GAME_MODE.PVE;
  player: string;
  botLevel: BotLevel;
};

type GameSettings = PvPSettings | PvESettings;

type GameState = {
  status: "not_started" | "playing" | "finished";
  result:
    | {
        type: "resulted";
        winner: COLOR_CODE;
      }
    | {
        type: "draw";
      }
    | undefined;
};

const initialGameState: GameState = {
  status: "not_started",
  result: undefined,
};

const playingGameState: GameState = {
  status: "playing",
  result: undefined,
};

type State = {
  state: TempState;
  gameMode: GAME_MODE;
  game: GameState;
  players: Players;
};

type Actions = {
  update: (fieldId: number) => void;
  skip: () => void;
  reset: () => void;
  restart: () => void;
  activateBot: () => void;
  initialize: (settings: GameSettings) => void;
};

/**
 * オセロのゲーム状態管理と更新関数を提供するhooks
 * ゲームルールはothelloReducerに委譲し、状態管理や描画に必要な情報などを扱う
 */
const useOthello = create<State & Actions>((set, get) => ({
  state: initialState,
  gameMode: GAME_MODE.PVP, // デフォルトをPVPに設定
  players: initialPlayers,
  game: initialGameState,
  update: (fieldId: number) => {
    set((state) => {
      const current = Othello.reconstruct(
        state.state.turn,
        state.state.board,
        state.state.color,
        state.state.skipCount
      );
      const updated = othelloReducer(current, { type: "update", fieldId });
      return {
        state: {
          ...updated.toArray(),
          meta: createMetaData(updated.board, updated.color),
          error:
            updated.turnNumber === current.turnNumber // ターンが進まなかった場合は失敗
              ? { hasError: true, message: "置けませんでした！" }
              : { hasError: false },
        },
        players: {
          ...state.players,
          active: state.players[updated.color],
        },
        game: updateGameStatus(updated),
      };
    });
  },
  skip: () => {
    set((state) => {
      const current = Othello.reconstruct(
        state.state.turn,
        state.state.board,
        state.state.color,
        state.state.skipCount
      );
      const updated = othelloReducer(current, { type: "skip" });
      return {
        state: {
          ...updated.toArray(),
          meta: createMetaData(updated.board, updated.color),
          error:
            updated.turnNumber === current.turnNumber // ターンが進まなかった場合は失敗
              ? { hasError: true, message: "このターンはスキップできません！" }
              : { hasError: false },
        },
        players: {
          ...state.players,
          active: state.players[updated.color],
        },
        game: updateGameStatus(updated),
      };
    });
  },
  reset: () =>
    set({
      state: initialState,
      gameMode: GAME_MODE.PVP,
      players: initialPlayers,
      game: initialGameState,
    }),
  restart: () =>
    set((state) => {
      return {
        state: {
          ...initialState,
        },
        gameMode: state.gameMode,
        players: {
          ...state.players,
          active: state.players[COLOR_CODE.WHITE],
        },
        game: playingGameState,
      };
    }),
  activateBot: async () => {
    const state = get().state;
    const isBotTurn = get().players[state.color].type === "bot";
    if (state.isOver || !isBotTurn) {
      return;
    }

    const think = get().players[state.color].think;
    if (think === undefined) throw new Error("Botが登録されていません");

    const move = think(state.board, state.color);

    if (move !== null) {
      get().update(move);
    } else {
      get().skip();
    }
  },
  initialize: (settings) => {
    const players: Players =
      settings.gameMode === GAME_MODE.PVP
        ? {
            [COLOR_CODE.WHITE]: initPlayer(settings.players[0]),
            [COLOR_CODE.BLACK]: initPlayer(settings.players[1]),
            active: initPlayer(settings.players[0]),
          }
        : {
            [COLOR_CODE.WHITE]: initPlayer(settings.player),
            [COLOR_CODE.BLACK]: initBot(settings.botLevel),
            active: initPlayer(settings.player),
          };

    set({
      state: initialState,
      gameMode: settings.gameMode,
      players,
      game: playingGameState,
    });
  },
}));

export default useOthello;

const updateGameStatus = (game: Othello): State["game"] => {
  if (game.isOver()) {
    const comparisonResult = game.board.compareToOpponent(COLOR_CODE.WHITE);
    return {
      status: "finished",
      result:
        comparisonResult === COMPARISON_RESULT.EQUAL
          ? { type: "draw" }
          : {
              type: "resulted",
              winner:
                comparisonResult === COMPARISON_RESULT.GREATER
                  ? COLOR_CODE.WHITE
                  : COLOR_CODE.BLACK,
            },
    };
  } else {
    return playingGameState;
  }
};
