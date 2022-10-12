import React, { useReducer } from 'react';
import { EMPTY_CODE, FieldObject } from '../components/parts/field';
import { COLOR_CODES, flip } from '../components/parts/stone';

type updateAction = {
  type: "update",
  fieldId: number,
}

type skipAction = {
  type: "skip",
}

type clearAction = {
  type: 'clear';
};

type Action = updateAction | skipAction | clearAction;

export type OthelloDispatcher = React.Dispatch<Action>;

// 盤面の初期値
const initialTurn = 1;
const initialBoard: Array<FieldObject> = [...Array(64)].map(
  (_, index) => {
    if ([27, 36].includes(index)) return COLOR_CODES.WHITE
    if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
    return EMPTY_CODE;
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
const othelloReducer = (state: State, action: Action): State => {  
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

// const move = (board, ) => {}

// reducerの戻り値ををそのまま帰す
const useOthello = (): [State, OthelloDispatcher] => {
  return useReducer(othelloReducer, initialState);
};

export default useOthello;
