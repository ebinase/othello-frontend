import { Board, FieldId } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';

// オセロに関するメタデータを定義する
// TODO: アクセスしやすさや拡張性を考慮してデータ構造を見直す
export type MetaData = {
  board: {
    white: {
      stones: number;
      selectable: FieldId[];
    };
    black: {
      stones: number;
      selectable: FieldId[];
    };
    isFulfilled: boolean;
  };
  active: {
    color: COLOR_CODE;
    stones: number;
    selectable: FieldId[];
  };
};

// 盤面のメタデータを生成する
// TODO: アクティブなプレイヤーの情報の計算はselectorなどに切り出す
export const createMetaData = (board: Board, activeColor: COLOR_CODE): MetaData => {
  const boardMetaData = {
    white: {
      stones: board.countStone(COLOR_CODE.WHITE),
      selectable: board.selectableFields(COLOR_CODE.WHITE),
    },
    black: {
      stones: board.countStone(COLOR_CODE.BLACK),
      selectable: board.selectableFields(COLOR_CODE.BLACK),
    },
    isFulfilled: board.isFulfilled(),
  };
  return {
    board: boardMetaData,
    active: {
      color: activeColor,
      ...boardMetaData[activeColor === COLOR_CODE.WHITE ? 'white' : 'black'],
    },
  };
};
