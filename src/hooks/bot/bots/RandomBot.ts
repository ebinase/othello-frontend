import { BoardData } from "../../../components/parts/board";
import { ColorCode } from "../../../components/parts/stone";
import { selectableFields } from "../../othello/logic/analyze";
import { Calculator } from "../BotTypes";

export const randomBot: Calculator = (board: BoardData, color: ColorCode) => {
 const fields = selectableFields(board, color);
 const i = Math.floor(Math.random() * fields.length);

 return fields[i];
};
