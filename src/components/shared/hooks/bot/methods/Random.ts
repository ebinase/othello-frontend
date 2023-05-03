import { BoardData } from "../../../../PlayGround/elements/Board/Board";
import { ColorCode } from "../../../../PlayGround/elements/Board/Stone";
import { selectableFields } from "../../../../PlayGround/hooks/logic/analyze";

export const randomBot = (
  board: BoardData,
  color: ColorCode
): number | null => {
  const fields = selectableFields(board, color);
  if (fields.length === 0) return null;

  const i = Math.floor(Math.random() * fields.length);

  return fields[i];
};
