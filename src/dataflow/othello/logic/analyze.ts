import { Board, BoardData } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';

// TODO: 将来的には削除する
export const shoudSkip = (board: BoardData, color: COLOR_CODE): boolean => {
  return Board.fromArray(board).selectableFields(color).length === 0;
};
