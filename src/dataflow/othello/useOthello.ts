import { BoardData } from '@models/Board/Board';
import { FieldId } from '../../components/PlayGround/elements/Board/Field';
import { create } from 'zustand';
import { StepBasedMCTS } from '../../components/shared/hooks/bot/methods/StepBasedMCTS';
import { COLOR_CODE } from '@models/Board/Color';
import { othelloReducer } from './othelloReducer';
import { createMetaData, MetaData } from './metadata';
import { Othello } from '@models/Game/Othello';
import { randomBot } from '@components/shared/hooks/bot/methods/Random';
import { TimeBasedMCTS } from '@components/shared/hooks/bot/methods/TimeBasedMCTS';

type Player = {
  name: string;
  type: 'human' | 'bot';
  think:
    | undefined
    | ((board: BoardData, color: COLOR_CODE) => FieldId | null);
};

type Players = {
  [COLOR_CODE.WHITE]: Player;
  [COLOR_CODE.BLACK]: Player;
  active: Player;
};

const initPlayer = (name: string): Player => {
  return {
    name,
    type: 'human',
    think: undefined,
  };
};

const initBot = (botLevel: number): Player => {
  let think;
  if (botLevel === 1) {
      think = randomBot;
  } else if (botLevel === 2) {
      think = StepBasedMCTS;
  } else if (botLevel === 3) {
    think = TimeBasedMCTS;
  } else {
    think = randomBot;
  }
  return {
    name: 'Bot Lv.' + botLevel,
    type: 'bot',
    think,
  };
};

const initialPlayers: Players = {
  [COLOR_CODE.WHITE]: initPlayer('WHITE'),
  [COLOR_CODE.BLACK]: initPlayer('BLACK'),
  active: initPlayer('WHITE'),
};

type OthelloState = {
  isOver: boolean;
  skipCount: number;
  turn: number;
  board: BoardData;
  color: COLOR_CODE;
  shouldSkip: boolean;
  meta: MetaData;
};

type GameState = OthelloState & {
  error?: {
    hasError: boolean;
    message?: any;
    data?: any;
  };
  isInitialized: boolean;
};

const initializedOthello = Othello.initialize();
const initialState: GameState = {
  ...initializedOthello.toArray(),
  meta: createMetaData(initializedOthello.board, initializedOthello.color),
  isInitialized: false,
};

export enum GAME_MODE {
  PVP = 'PVP',
  PVE = 'PVE',
}

export type PvPSettings = {
  gameMode: GAME_MODE.PVP;
  players: string[];
};

export type PvESettings = {
  gameMode: GAME_MODE.PVE;
  player: string;
  botLevel: number;
};

type GameSettings = PvPSettings | PvESettings;

type State = {
  state: GameState;
  gameMode: GAME_MODE;
  players: Players;
};

type Actions = {
  update: (fieldId: number) => void;
  skip: () => void;
  reset: () => void;
  activateBot: () => void;
  initialize: (settings: GameSettings) => void;
};

/**
 * オセロのゲーム状態管理と更新関数を提供するhooks
 * ゲームルールはothelloReducerに委譲し、状態管理や描画に必要な情報などを扱う
 */
const useOthello = create<State & Actions>((set, get) => ({
  state: initialState,
  gameMode: GAME_MODE.PVP, // デフォルトをPVPに設定
  players: initialPlayers,
  update: (fieldId: number) => {
    set((state) => {
      const current = Othello.reconstruct(
        state.state.turn,
        state.state.board,
        state.state.color,
        state.state.skipCount
      );
      const updated = othelloReducer(current, { type: 'update', fieldId });
      return {
        state: {
          ...updated.toArray(),
          meta: createMetaData(updated.board, updated.color),
          isInitialized: true, // プレーを開始したら初期化済みとする
          error:
            updated.turnNumber === current.turnNumber // ターンが進まなかった場合は失敗
              ? { hasError: true, message: '置けませんでした！' }
              : { hasError: false },
        },
        players: {
          ...state.players,
          active: state.players[updated.color],
        },
      };
    });
  },
  skip: () => {
    set((state) => {
      const current = Othello.reconstruct(
        state.state.turn,
        state.state.board,
        state.state.color,
        state.state.skipCount
      );
      const updated = othelloReducer(current, { type: 'skip' });
      return {
        state: {
          ...updated.toArray(),
          meta: createMetaData(updated.board, updated.color),
          isInitialized: true, // プレーを開始したら初期化済みとする
          error:
            updated.turnNumber === current.turnNumber // ターンが進まなかった場合は失敗
              ? { hasError: true, message: 'このターンはスキップできません！' }
              : { hasError: false },
        },
        players: {
          ...state.players,
          active: state.players[updated.color],
        },
      };
    });
  },
  reset: () =>
    set({
      state: initialState,
      gameMode: GAME_MODE.PVP,
      players: initialPlayers,
    }),
  activateBot: async () => {
    const state = get().state;
    const isBotTurn = get().players[state.color].type === 'bot';
    if (state.isOver || !isBotTurn) {
      return;
    }

    const think = get().players[state.color].think;
    if (think === undefined) throw new Error('Botが登録されていません');

    const move = think(state.board, state.color);

   if (move !== null) {
     get().update(move);
   } else {
     get().skip();
   }
  },
  initialize: (settings) => {
    const players: Players =
      settings.gameMode === GAME_MODE.PVP
        ? {
            [COLOR_CODE.WHITE]: initPlayer(settings.players[0]),
            [COLOR_CODE.BLACK]: initPlayer(settings.players[1]),
            active: initPlayer(settings.players[0]),
          }
        : {
            [COLOR_CODE.WHITE]: initPlayer(settings.player),
            [COLOR_CODE.BLACK]: initBot(settings.botLevel),
            active: initPlayer(settings.player),
          };

    set({
      state: {
        ...initialState,
        isInitialized: true,
      },
      gameMode: settings.gameMode,
      players,
    });
  },
}));

export default useOthello;
