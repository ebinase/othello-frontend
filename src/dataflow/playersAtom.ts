import { COLOR_CODE } from '@models/Board/Color';
import { BotLevel } from '@models/Bot/BotList';
import { atom } from 'jotai';

type BasePlayer = {
  name: string;
  color: COLOR_CODE;
  type: 'human' | 'bot';
};

type Human = BasePlayer & {
  type: 'human';
};

type Bot = BasePlayer & {
  type: 'bot'
  level: BotLevel
}

type Player = Human | Bot;

export type Players = {
  [COLOR_CODE.WHITE]: Player;
  [COLOR_CODE.BLACK]: Player;
};

const initialPlayers: Players = {
  [COLOR_CODE.WHITE]: {
    name: 'WHITE PLAYER',
    color: COLOR_CODE.WHITE,
    type: 'human',
  },
  [COLOR_CODE.BLACK]: {
    name: 'BLACK PLAYER',
    color: COLOR_CODE.BLACK,
    type: 'human',
  },
};

// 意図しない変更を防ぐため、primitive atomは非公開にしておく
const playersAtom = atom<Players>(initialPlayers);

// 公開用 read/write atom
export const playersSelector = atom((get) => get(playersAtom));
export const playersInitializeExecutor = atom(null, (get, set, players: Players) => {
  set(playersAtom, players);
});