import { othelloSelector } from '@dataflow/othelloAtom';
import { Board } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';
import { atom } from 'jotai';

// 盤面のメタデータを取得するatom
export const analysisSelector = atom((get) => {
  const board = Board.fromArray(get(othelloSelector).board);
  return {
    [COLOR_CODE.WHITE]: {
      stones: board.countStone(COLOR_CODE.WHITE),
      selectable: board.selectableFields(COLOR_CODE.WHITE),
    },
    [COLOR_CODE.BLACK]: {
      stones: board.countStone(COLOR_CODE.BLACK),
      selectable: board.selectableFields(COLOR_CODE.BLACK),
    },
  };
});