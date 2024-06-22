import { BoardData } from "@models/Board/Board";
import { EMPTY_CODE } from "../../../../PlayGround/elements/Board/Field";
import { COLOR_CODES } from "../../../../PlayGround/elements/Board/Stone";

const slide: BoardData[] = [
  [...Array(64)].map((_, index) => {
    if ([27, 36].includes(index)) return COLOR_CODES.WHITE;
    if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
    return EMPTY_CODE;
  }),
];

export default slide;
