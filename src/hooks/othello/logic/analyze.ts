import { BoardData } from "../../../components/parts/board";
import { EMPTY_CODE } from "../../../components/parts/field";
import { ColorCode } from "../../../components/parts/stone";
import { getLines } from "./matrix";

export const shoudSkip = (board: BoardData, color: ColorCode): boolean => {
  return scoreMap(board, color).filter((score) => score > 0).length === 0;
};

export const scoreMap = (board: BoardData, color: ColorCode) => {
  return board.map((_, fieldId) => getScore(board, color)(fieldId));
};

const getScore = (board: BoardData, color: ColorCode) => {
  return (fieldId: number) => {
    if (board[fieldId] !== EMPTY_CODE) return 0;
    return getLines(board, fieldId)
      .map((line) => countFlipableStoneInLine(line, color))
      .reduce((sum, score) => sum + score, 0);
  };
};

export const countFlipableStoneInLine = (line: BoardData, color: ColorCode) => {
  if (line.length === 0) return 0;

  let score = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === EMPTY_CODE) return 0;
    if (line[i] === color) return score;
    score++;
  }
  return 0;
};

export const rest = (board: BoardData): number =>
  board.filter((field) => field === EMPTY_CODE).length;

export const countStone = (board: BoardData, color: ColorCode): number =>
  board.filter((field) => field === color).length;
