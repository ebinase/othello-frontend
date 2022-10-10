import { useReducer } from 'react';

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

type drawAction = {
  type: 'draw',
  fieldId: number,
  color: 1 | 2,
};

type action = updateAction | skipAction | clearAction | drawAction;

// 盤面の初期値
const initialBoard: Array<number | undefined> = [...Array(64)];

// 盤面の更新関数
const boardReducer = (board: Array<number | undefined>, action: action) => {
  switch (action.type) {
    case 'update':
      return [...board].map((value, index) =>
        index === action.fieldId ? action.color : value
      );
    case 'clear':
      return initialBoard;
    case 'draw':
      return [...board].map((value, index) =>
        index === action.fieldId ? action.color : value
      );
    default:
      return board;
  }
};

// reducerの戻り値ををそのまま帰す
const useOthello = () => {
  return useReducer(boardReducer, initialBoard);
};

export default useOthello;
