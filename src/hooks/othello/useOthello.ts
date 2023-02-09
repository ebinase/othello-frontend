import React, { useReducer } from "react";
import { BoardData } from "../../components/parts/board";
import { EMPTY_CODE } from "../../components/parts/field";
import { ColorCode, COLOR_CODES, flip } from "../../components/parts/stone";
import { move } from "./logic/core";
import { rest } from "./logic/analyze";

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

const initialState: GameState = {
  isOver: false,
  isSkipped: false,
  turn: initialTurn,
  board: initialBoard,
  color: initialColor,
};

export type GameState = {
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

// オセロゲームの更新関数
const othelloReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'update':
      try {
        const updated = move(state.board, action.fieldId, state.color);
        return {
          isOver: rest(updated) === 0, // 置くところがなくなれば終了
          isSkipped: false,
          turn: state.turn++,
          board: updated,
          color: flip(state.color),
        };
      } catch (e) {
        return {
          ...state,
          error: { hasError: true, message: '置けませんでした！' },
        };
      } 
    case 'skip':
      return {
        isOver: state.isSkipped, // 前のターンでもスキップされていたら強制終了
        isSkipped: true,
        turn: state.turn++,
        board: state.board,
        color: flip(state.color),
      };
    case 'clear':
      return initialState;
    default:
      return state;
  }
};

// reducerの戻り値ををそのまま返す
const useOthello = (): [GameState, OthelloDispatcher] => {
  return useReducer(othelloReducer, initialState);
};

export default useOthello;
