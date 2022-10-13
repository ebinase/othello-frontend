import React, { useReducer } from 'react';
import { BoardData } from '../components/parts/board';
import { EMPTY_CODE, FieldObject } from '../components/parts/field';
import { ColorCode, COLOR_CODES, flip } from '../components/parts/stone';

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
const initialBoard: BoardData = [...Array(64)].map((_, index) => {
  if ([27, 36].includes(index)) return COLOR_CODES.WHITE;
  if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
  return EMPTY_CODE;
});
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
      try {
        move(state.board, action.fieldId, state.color)
        return state
      } catch (e) {
        console.log(e);
        return state;
      }
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

const move = (board: BoardData, fieldId: number, color: ColorCode) => {
  if (board[fieldId] !== EMPTY_CODE) throw Error('置けないよ！');
  const score = getLines(board, fieldId).map((line) => {
    return flipStoneInLine(line, color);
  }).reduce((sum, score) => sum + score, 0)
  console.log(score);
}

const toMatrix = (board: BoardData, rowLength: number): FieldObject[][] => {
    let matrix = [];
    for (var i = 0; i < board.length; i += rowLength) {
      matrix.push(board.slice(i, i + rowLength));
    }
    return matrix
}

// FIXME: 迷走したやっつけ実装なのでリファクタリング
const getLines = (board: BoardData, fieldId: number) => {
  const matrix = toMatrix(board, 8);
  const coord = { row: Math.floor(fieldId / 8), col: fieldId % 8 };
  
  let lines = [];
  for (let row_i = -1; row_i <= 1; row_i++) {
    for (let col_j = -1; col_j <= 1; col_j++) {
      if (row_i === 0 && col_j === 0) continue; 
      
      let tmp: FieldObject[] = [];
      let offset = 1
      while (
        coord.row + row_i * offset >= 0 && coord.row + row_i * offset < 8 &&
        coord.col + col_j * offset >= 0 && coord.col + col_j * offset < 8
      ) {
        let value =
          matrix[coord.row + row_i * offset][coord.col + col_j * offset];
        tmp.push(value)
        offset++;
      }
      lines.push(tmp);
    }
  }

  return lines;
}

const flipStoneInLine = (line: BoardData, color: ColorCode) => {
  if (line.length === 0) return 0;

  let score = 0
  for (let i = 0; i < line.length; i++) {
    if (line[i] === EMPTY_CODE) return 0;
    if (line[i] === color) return score;
    score++;
  }
  return score;
}

// reducerの戻り値ををそのまま帰す
const useOthello = (): [State, OthelloDispatcher] => {
  return useReducer(othelloReducer, initialState);
};

export default useOthello;
