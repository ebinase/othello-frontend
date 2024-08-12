import { Analysis, analysisSelector } from '@dataflow/board/analysisSelector';
import { PlayersAtomValue, playersSelector } from '@dataflow/playersAtom';
import { COLOR_CODE } from '@models/Board/Color';
import { atom } from 'jotai';

export type AnalyzedPlayers = PlayersAtomValue & Analysis;

// 盤面のメタデータを保持したプレイヤー情報を取得するatom
export const analyzedPlayersSelector = atom<AnalyzedPlayers>((get) => {
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
