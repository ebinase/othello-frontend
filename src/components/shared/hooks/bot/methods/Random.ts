import { Board, BoardData } from "@models/Board/Board";
import { ColorCode } from "../../../../PlayGround/elements/Board/Stone";

export const randomBot = (
  board: BoardData,
  color: ColorCode
): number | null => {
  const fields = Board.fromArray(board).selectableFields(color);
  if (fields.length === 0) return null;

  const i = Math.floor(Math.random() * fields.length);

  return fields[i];
};
