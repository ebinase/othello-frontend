import { BoardData } from "../../../components/parts/board";
import { EMPTY_CODE } from "../../../components/parts/field";
import { COLOR_CODES } from "../../../components/parts/stone";

const slide: BoardData[] = [
  [...Array(64)].map((_, index) => {
    if ([27, 36].includes(index)) return COLOR_CODES.WHITE;
    if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
    return EMPTY_CODE;
  }),
];

export default slide;