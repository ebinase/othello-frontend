import { Board, BoardData } from "@models/Board/Board";
import { ColorCode } from "../../../components/PlayGround/elements/Board/Stone";

// TODO: 将来的には削除する
export const shoudSkip = (board: BoardData, color: ColorCode): boolean => {
  return Board.fromArray(board).selectableFields(color).length === 0;
};