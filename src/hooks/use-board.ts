import { type } from 'os';
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

type action = updateAction | skipAction | clearAction;

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
    default:
      return board;
  }
};

// reducerの戻り値ををそのまま帰す
const useBoard = () => {
  return useReducer(boardReducer, initialBoard);
}

export default useBoard;
