import { atom, useRecoilState } from "recoil";
import { BoardData } from "../../components/PlayGround/elements/Board/Board";
import { EMPTY_CODE } from "../../components/PlayGround/elements/Board/Field";
import {
  ColorCode,
  COLOR_CODES,
  flip,
} from "../../components/PlayGround/elements/Board/Stone";
import { rest } from "./logic/analyze";
import { move } from "./logic/core";

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
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
};

const othelloState = atom<GameState>({
  key: "dataflow/othello",
  default: initialState,
});

const useOthello = () => {
  const [state, setState] = useRecoilState(othelloState);

  const update = (fieldId: number) => {
    setState(othelloReducer(state, { type: "update", fieldId }));
  };

  const skip = () => {
    setState(othelloReducer(state, { type: "skip" }));
  };

  const reset = () => {
    setState(initialState);
  };

  return { state, update, skip, reset };
};

export default useOthello;
