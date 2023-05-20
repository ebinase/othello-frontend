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

const defaultPlayers = {
  [COLOR_CODES.WHITE]: {
    name: "白プレイヤー",
    type: "human" as Player["type"],
    think: undefined,
  },
  [COLOR_CODES.BLACK]: {
    name: "Bot",
    type: "bot" as Player["type"],
    think: async (board: BoardData, color: ColorCode) => MCTS(board, color),
  },
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
  players: defaultPlayers,
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
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
};

type State = {
  state: GameState;
};

type Actions = {
  update: (fieldId: number) => void;
  skip: () => void;
  reset: () => void;
  activateBot: () => void;
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
    console.log(
      "activateBot====================================================="
    );

    const state = get().state;
    const isBotTurn = state.players[state.color].type === "bot";
    const update = get().update;

    if (state.isOver || !isBotTurn) {
      console.log("not bot turn");
      return;
    }

    const think = state.players[state.color].think;
    if (think === undefined) throw new Error("Botが登録されていません");
    console.log("計算開始！！！！！！！！");

    const move = await think(state.board, state.color);
    console.log("move", move);
    if (move === null) return get().skip();

    update(move);
  },
}));

export default useOthello;
