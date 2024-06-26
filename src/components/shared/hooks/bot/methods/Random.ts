import { Board, BoardData } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';

export const randomBot = (
  board: BoardData,
  color: COLOR_CODE
): number | null => {
  const fields = Board.fromArray(board).selectableFields(color);
  if (fields.length === 0) return null;

  const i = Math.floor(Math.random() * fields.length);

  return fields[i];
};
