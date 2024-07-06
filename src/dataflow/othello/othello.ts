import { BoardData } from '@models/Board/Board';
import { FieldId } from '../../components/PlayGround/elements/Board/Field';
import { create } from 'zustand';
import { MCTS } from '../../components/shared/hooks/bot/methods/MCTS';
import { COLOR_CODE } from '@models/Board/Color';
import {
  initialOthelloState,
  othelloReducer,
  OthelloState,
} from './othelloReducer';

type Player = {
  name: string;
  type: 'human' | 'bot';
  think:
    | undefined
    | ((board: BoardData, color: COLOR_CODE) => Promise<FieldId | null>);
};

type Players = Record<COLOR_CODE, Player>;

const initPlayer = (name: string): Player => {
  return {
    name,
    type: 'human',
    think: undefined,
  };
};

const initBot = (): Player => {
  return {
    name: 'Bot Lv.5',
    type: 'bot',
    think: async (board: BoardData, color: COLOR_CODE) => MCTS(board, color),
  };
};

type GameState = OthelloState & {
  error?: {
    hasError: boolean;
    message?: any;
    data?: any;
  };
  players: Players;
  isInitialized: boolean;
};

const initialState: GameState = {
  ...initialOthelloState,
  players: {
    [COLOR_CODE.WHITE]: initPlayer('WHITE'),
    [COLOR_CODE.BLACK]: initPlayer('BLACK'),
  },
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
  playerColor: COLOR_CODE;
};

type GameSettings = PvPSettings | PvESettings;

type State = {
  state: GameState;
  gameMode: GAME_MODE | undefined;
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
  gameMode: undefined,
  update: (fieldId: number) => {
    set((state) => {
      const updated = othelloReducer(state.state, { type: 'update', fieldId });
      return {
        state: {
          ...updated,
          isInitialized: true, // プレーを開始したら初期化済みとする
          players: state.state.players,
          error:
            updated.updatedFieldIdList.length === 0  // 一つも返していない場合は失敗扱いする
              ? { hasError: true, message: '置けませんでした！' }
              : { hasError: false },
        },
      };
    });
    // ゲームモードが明示的に設定されなかった場合はPVPとして扱う
    set((state) => ({
      gameMode: state.gameMode ?? GAME_MODE.PVP,
    }));
  },
  skip: () => {
    set((state) => ({
      state: {
        ...state.state,
        ...othelloReducer(state.state, { type: 'skip' }),
      },
    }));
  },
  reset: () =>
    set({
      state: initialState,
      gameMode: undefined,
    }),
  activateBot: async () => {
    const state = get().state;
    const isBotTurn = state.players[state.color].type === 'bot';
    const update = get().update;

    if (state.isOver || !isBotTurn) {
      return;
    }

    const think = state.players[state.color].think;
    if (think === undefined) throw new Error('Botが登録されていません');

    const move = await think(state.board, state.color);
    if (move === null) return get().skip();

    update(move);
  },
  initialize: (settings) => {
    const players: Players =
      settings.gameMode === GAME_MODE.PVP
        ? {
            [COLOR_CODE.WHITE]: initPlayer(settings.players[0]),
            [COLOR_CODE.BLACK]: initPlayer(settings.players[1]),
          }
        : {
            [COLOR_CODE.WHITE]:
              settings.playerColor === COLOR_CODE.WHITE
                ? initPlayer(settings.player)
                : initBot(),
            [COLOR_CODE.BLACK]:
              settings.playerColor === COLOR_CODE.BLACK
                ? initPlayer(settings.player)
                : initBot(),
          };

    set({
      state: {
        ...initialState,
        players,
        isInitialized: true,
      },
      gameMode: settings.gameMode,
    });
  },
}));

export default useOthello;
