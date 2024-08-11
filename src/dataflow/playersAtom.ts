import { COLOR_CODE } from '@models/Board/Color';
import { Player } from '@models/Player/Player';
import { atom } from 'jotai';

export type PlayersAtomValue = {
  [COLOR_CODE.WHITE]: Player & { color: COLOR_CODE };
  [COLOR_CODE.BLACK]: Player & { color: COLOR_CODE };
};

const initialPlayers: PlayersAtomValue = {
  [COLOR_CODE.WHITE]: {
    name: 'WHITE',
    color: COLOR_CODE.WHITE,
    type: 'human',
  },
  [COLOR_CODE.BLACK]: {
    name: 'BLACK',
    color: COLOR_CODE.BLACK,
    type: 'human',
  },
};

// 意図しない変更を防ぐため、primitive atomは非公開にしておく
const playersAtom = atom<PlayersAtomValue>(initialPlayers);

// 公開用 read/write atom
export const playersSelector = atom((get) => get(playersAtom));
export const playersInitializeExecutor = atom(null, (get, set) => {
  set(playersAtom, initialPlayers);
});

export const playersUpdateExecutor = atom(
  null,
  (get, set, players: PlayersAtomValue = initialPlayers) => {
    set(playersAtom, players);
  }
);

export const buildPlayers =
  () =>
  (white: Player) =>
  (black: Player): PlayersAtomValue => {
    return {
      [COLOR_CODE.WHITE]: {
        ...white,
        color: COLOR_CODE.WHITE,
      },
      [COLOR_CODE.BLACK]: {
        ...black,
        color: COLOR_CODE.BLACK,
      },
    };
  };
