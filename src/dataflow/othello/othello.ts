import { BoardData } from "../../components/PlayGround/elements/Board/Board";
import {
  EMPTY_CODE,
  FieldId,
} from "../../components/PlayGround/elements/Board/Field";
import {
  ColorCode,
  COLOR_CODES,
  flip,
} from "../../components/PlayGround/elements/Board/Stone";
import { rest } from "./logic/analyze";
import { move } from "./logic/core";
import { create } from "zustand";
import { MCTS } from "../../components/shared/hooks/bot/methods/MCTS";

type Player = {
  name: string;
  type: "human" | "bot";
  think:
    | undefined
    | ((board: BoardData, color: ColorCode) => Promise<FieldId | null>);
};

type Players = Record<ColorCode, Player>;

const initPlayer = (name: string): Player => {
  return {
    name,
    type: "human",
    think: undefined,
  };
};

const initBot = (): Player => {
  return {
    name: "Bot",
    type: "bot",
    think: async (board: BoardData, color: ColorCode) => MCTS(board, color),
  };
};

type GameState = {
  isOver: boolean;
  isSkipped: boolean;
  turn: number;
  board: BoardData;
  color: ColorCode;
  error?: {
    hasError: boolean;
    message?: any;
    data?: any;
  };
  players: Players;
  isInitialized: boolean;
};

type updateAction = {
  type: "update";
  fieldId: number;
};

type skipAction = {
  type: "skip";
};

type clearAction = {
  type: "clear";
};

type Action = updateAction | skipAction | clearAction;

export type OthelloDispatcher = React.Dispatch<Action>;

// 初期値
const initialTurn = 1;
const initialBoard: BoardData = [...Array(64)].map((_, index) => {
  if ([27, 36].includes(index)) return COLOR_CODES.WHITE;
  if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
  return EMPTY_CODE;
});
const initialColor = COLOR_CODES.WHITE;

const initialState: GameState = {
  isOver: false,
  isSkipped: false,
  turn: initialTurn,
  board: initialBoard,
  color: initialColor,
  players: {
    [COLOR_CODES.WHITE]: initPlayer("Player2"),
    [COLOR_CODES.BLACK]: initPlayer("Player1"),
  },
  isInitialized: false,
};

const othelloReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case "update":
      try {
        const updated = move(state.board, action.fieldId, state.color);
        return {
          isOver: rest(updated) === 0, // 置くところがなくなれば終了
          isSkipped: false,
          turn: state.turn + 1,
          board: updated,
          color: flip(state.color),
          players: state.players,
          isInitialized: true, // プレーを開始したら初期化済みとする
        };
      } catch (e) {
        return {
          ...state,
          error: { hasError: true, message: "置けませんでした！" },
        };
      }
    case "skip":
      return {
        isOver: state.isSkipped, // 前のターンでもスキップされていたら強制終了
        isSkipped: true,
        turn: state.turn + 1,
        board: state.board,
        color: flip(state.color),
        players: state.players,
        isInitialized: state.isInitialized,
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
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
  players: string;
  playerColor: ColorCode;
};

type GameSettings = PvPSettings | PvESettings;

type State = {
  state: GameState;
};

type Actions = {
  update: (fieldId: number) => void;
  skip: () => void;
  reset: () => void;
  activateBot: () => void;
  initialize: (settings: GameSettings) => void;
};

const useOthello = create<State & Actions>((set, get) => ({
  state: initialState,
  update: (fieldId: number) => {
    set((state) => ({
      state: othelloReducer(state.state, { type: "update", fieldId }),
    }));
  },
  skip: () =>
    set((state) => ({
      state: othelloReducer(state.state, { type: "skip" }),
    })),
  reset: () => set({ state: initialState }),
  activateBot: async () => {
    const state = get().state;
    const isBotTurn = state.players[state.color].type === "bot";
    const update = get().update;

    if (state.isOver || !isBotTurn) {
      return;
    }

    const think = state.players[state.color].think;
    if (think === undefined) throw new Error("Botが登録されていません");

    const move = await think(state.board, state.color);
    if (move === null) return get().skip();

    update(move);
  },
  initialize: (settings) => {
    const players: Players =
      settings.gameMode === GAME_MODE.PVP
        ? {
            [COLOR_CODES.WHITE]: initPlayer(settings.players[0]),
            [COLOR_CODES.BLACK]: initPlayer(settings.players[1]),
          }
        : {
            [COLOR_CODES.WHITE]:
              settings.playerColor === COLOR_CODES.WHITE
                ? initPlayer(settings.players)
                : initBot(),
            [COLOR_CODES.BLACK]:
              settings.playerColor === COLOR_CODES.BLACK
                ? initPlayer(settings.players)
                : initBot(),
          };

    set({
      state: {
        ...initialState,
        players,
        isInitialized: true,
      },
    });
  },
}));

export default useOthello;
