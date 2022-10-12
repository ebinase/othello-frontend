import { useReducer } from 'react';
import { COLOR_CODES, flip } from '../components/parts/stone';

type updateAction = {
  type: "update",
  fieldId: number,
  color: 1|2
}

type skipAction = {
  type: "skip",
}

type clearAction = {
  type: 'clear';
};

type Action = updateAction | skipAction | clearAction;

// 盤面の初期値
const initialTurn = 1;
const initialBoard: Array<number | undefined> = [...Array(64)].map(
  (_, index) => {
    if ([27, 36].includes(index)) return COLOR_CODES.WHITE
    if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
    return undefined;
  }
);
const initialColor = COLOR_CODES.WHITE;

const initialState = {
  turn: initialTurn,
  board: initialBoard,
  color: initialColor,
}

type State = typeof initialState

// オセロゲームの更新関数
const othelloReducer = (state: State, action: Action) => {
  console.log(state, flip(state.color));
  
  switch (action.type) {
    case 'update':
      return {
        turn: state.turn++,
        board: [...state.board].map((value, index) =>
          index === action.fieldId ? state.color : value
        ),
        color: flip(state.color),
      };
    case 'clear':
      return {
        turn:  initialTurn,
        board: initialBoard,
        color: initialColor,
      };
    default:
      return state;
  }
};

// reducerの戻り値ををそのまま帰す
const useOthello = () => {
  return useReducer(othelloReducer, initialState);
};

export default useOthello;
