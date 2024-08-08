import { analysisSelector } from '@dataflow/board/analysisSlector';
import { playersSelector } from '@dataflow/playersAtom';
import { COLOR_CODE } from '@models/Board/Color';
import { atom } from 'jotai';

// 盤面のメタデータを保持したプレイヤー情報を取得するatom
export const analyzedPlayersSlector = atom((get) => {
  const players = get(playersSelector);
  const analysis = get(analysisSelector);

  // プレイヤー情報と盤面のメタデータをマージする
  return {
    [COLOR_CODE.WHITE]: {
      ...players[COLOR_CODE.WHITE],
      ...analysis[COLOR_CODE.WHITE],
    },
    [COLOR_CODE.BLACK]: {
      ...players[COLOR_CODE.BLACK],
      ...analysis[COLOR_CODE.BLACK],
    },
  };
});