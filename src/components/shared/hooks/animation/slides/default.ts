import { BoardData } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';
import { EMPTY_CODE } from '../../../../PlayGround/elements/Board/Field';

const slide: BoardData[] = [
  [...Array(64)].map((_, index) => {
    if ([27, 36].includes(index)) return COLOR_CODE.WHITE;
    if ([28, 35].includes(index)) return COLOR_CODE.BLACK;
    return EMPTY_CODE;
  }),
];

export default slide;
