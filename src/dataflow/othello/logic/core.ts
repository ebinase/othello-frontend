import { BoardData } from "@models/Board/Board";
import { EMPTY_CODE } from "../../../components/PlayGround/elements/Board/Field";
import { ColorCode } from "../../../components/PlayGround/elements/Board/Stone";
import { countFlipableStoneInLine } from "./analyze";
import { directions, getCurrentCoord, getLines, toMatrix } from "./matrix";

export const move = (board: BoardData, fieldId: number, color: ColorCode) => {
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
