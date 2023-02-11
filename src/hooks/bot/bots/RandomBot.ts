import { BoardData } from "../../../components/parts/board";
import { ColorCode } from "../../../components/parts/stone";
import { scoreMap } from "../../othello/logic/analyze";
import { Calculator } from "../BotTypes";

export const randomBot: Calculator = (board: BoardData, color: ColorCode) => {
  const selectableFields: number[] = scoreMap(board, color)
    .map((value, index) => (value > 0 ? index : undefined))
    .filter(
      (value): value is Exclude<typeof value, undefined> => value !== undefined
    );
  const i = Math.floor(Math.random() * selectableFields.length);

  return selectableFields[i];
};
