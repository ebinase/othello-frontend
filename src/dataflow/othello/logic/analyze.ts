import { Board, BoardData } from "@models/Board/Board";
import { EMPTY_CODE } from "../../../components/PlayGround/elements/Board/Field";
import { ColorCode } from "../../../components/PlayGround/elements/Board/Stone";

// TODO: 将来的には削除する
export const shoudSkip = (board: BoardData, color: ColorCode): boolean => {
  return Board.fromArray(board).selectableFields(color).length === 0;
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
