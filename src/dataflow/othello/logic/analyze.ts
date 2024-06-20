import { BoardData } from "@models/Board/Board";
import { EMPTY_CODE } from "../../../components/PlayGround/elements/Board/Field";
import { ColorCode } from "../../../components/PlayGround/elements/Board/Stone";
import { getLines } from "./matrix";

export const shoudSkip = (board: BoardData, color: ColorCode): boolean => {
  return scoreMap(board, color).filter((score) => score > 0).length === 0;
};

export const selectableFields = (
  board: BoardData,
  color: ColorCode
): number[] => {
  return scoreMap(board, color)
    .map((value, index) => (value > 0 ? index : undefined))
    .filter(
      (value): value is Exclude<typeof value, undefined> => value !== undefined
    );
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
