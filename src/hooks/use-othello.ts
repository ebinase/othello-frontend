import React, { useReducer } from "react";
import { BoardData } from "../components/parts/board";
import { EMPTY_CODE, FieldObject } from "../components/parts/field";
import { ColorCode, COLOR_CODES, flip } from "../components/parts/stone";

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
};

type State = {
  turn: number;
  board: BoardData;
  color: ColorCode;
  error?: {
    hasError: boolean;
    message?: any;
    data?: any;
  };
};

// オセロゲームの更新関数
const othelloReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update":
      try {
        return {
          turn: state.turn++,
          board: move(state.board, action.fieldId, state.color),
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
        turn: state.turn++,
        board: state.board,
        color: flip(state.color),
      };
    case "clear":
      return {
        turn: initialTurn,
        board: initialBoard,
        color: initialColor,
      };
    default:
      return state;
  }
};

const directions = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

const move = (board: BoardData, fieldId: number, color: ColorCode) => {
  if (board[fieldId] !== EMPTY_CODE) throw Error("置けないよ！");

  const scores = getLines(board, fieldId).map((line) => {
    return countFlipableStoneInLine(line, color);
  });
  if (
    scores.reduce((sum, score) => {
      return sum + score;
    }, 0) === 0
  )
    throw Error("ひとつも返せないよ！");
  return flipStone(board, fieldId, scores, color);
};

const flipStone = (
  board: BoardData,
  fieldId: number,
  scores: number[],
  color: ColorCode
) => {
  let matrix = toMatrix(board, 8);
  const origin = { row: Math.floor(fieldId / 8), col: fieldId % 8 };

  matrix[origin.row][origin.col] = color;

  directions.forEach((direction, index) => {
    for (let offset = 1; offset <= scores[index]; offset++) {
      let currentCoord = getCurrentCoord(origin, direction, offset);
      matrix[currentCoord.row][currentCoord.col] = color;
    }
  });
  return matrix.flat();
};

const toMatrix = (board: BoardData, rowLength: number): FieldObject[][] => {
  let matrix = [];
  for (var i = 0; i < board.length; i += rowLength) {
    matrix.push(board.slice(i, i + rowLength));
  }
  return matrix;
};

// FIXME: 迷走したやっつけ実装なのでリファクタリング
const getLines = (board: BoardData, fieldId: number) => {
  const matrix = toMatrix(board, 8);
  const origin = { row: Math.floor(fieldId / 8), col: fieldId % 8 };

  return directions.map((direction) => {
    let tmp: FieldObject[] = [];
    let offset = 1;

    let currentCoord = getCurrentCoord(origin, direction, offset);
    while (
      currentCoord.row >= 0 &&
      currentCoord.row < 8 &&
      currentCoord.col >= 0 &&
      currentCoord.col < 8
    ) {
      tmp.push(matrix[currentCoord.row][currentCoord.col]);
      offset++;
      currentCoord = getCurrentCoord(origin, direction, offset);
    }

    return tmp;
  });
};

const getCurrentCoord = (origin: any, direction: any, offset: number) => {
  return {
    row: origin.row + direction.row * offset,
    col: origin.col + direction.col * offset,
  };
};

const countFlipableStoneInLine = (line: BoardData, color: ColorCode) => {
  console.log(line);
  if (line.length === 0) return 0;

  let score = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === EMPTY_CODE) return 0;
    if (line[i] === color) return score;
    score++;
  }
  return 0;
};

// reducerの戻り値ををそのまま返す
const useOthello = (): [State, OthelloDispatcher] => {
  return useReducer(othelloReducer, initialState);
};

export default useOthello;
