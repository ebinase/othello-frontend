import { BoardData } from '@models/Board/Board';
import { FieldId } from '../../components/PlayGround/elements/Board/Field';
import { flip } from '@models/Board/Color';
import { create } from 'zustand';
import { MCTS } from '../../components/shared/hooks/bot/methods/MCTS';
import { Board } from '../../models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';

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

type GameState = {
  isOver: boolean;
  isSkipped: boolean;
  turn: number;
  board: BoardData;
  color: COLOR_CODE;
  error?: {
    hasError: boolean;
    message?: any;
    data?: any;
  };
  players: Players;
  isInitialized: boolean;
};

type updateAction = {
  type: 'update';
  fieldId: number;
};

type skipAction = {
  type: 'skip';
};

type clearAction = {
  type: 'clear';
};

type Action = updateAction | skipAction | clearAction;

export type OthelloDispatcher = React.Dispatch<Action>;

// 初期値
const initialTurn = 1;
const initialBoard: BoardData = Board.initialize().toArray();
const initialColor = COLOR_CODE.WHITE;

const initialState: GameState = {
  isOver: false,
  isSkipped: false,
  turn: initialTurn,
  board: initialBoard,
  color: initialColor,
  players: {
    [COLOR_CODE.WHITE]: initPlayer('WHITE'),
    [COLOR_CODE.BLACK]: initPlayer('BLACK'),
  },
  isInitialized: false,
};

const othelloReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'update':
      const result = Board.fromArray(state.board).update(
        action.fieldId,
        state.color
      );
      return result.when({
        success: (board) => {
          return {
            isOver:
              board.isFulfilled() || // 置くところがなくなれば終了
              board.countStone(COLOR_CODE.WHITE) === 0 ||
              board.countStone(COLOR_CODE.BLACK) === 0,
            isSkipped: false,
            turn: state.turn + 1,
            board: board.toArray(),
            color: flip(state.color),
            players: state.players,
            isInitialized: true, // プレーを開始したら初期化済みとする
          };
        },
        failure: (_) => {
          return {
            ...state,
            error: { hasError: true, message: '置けませんでした！' },
          };
        },
      });
    case 'skip':
      return {
        isOver: state.isSkipped, // 前のターンでもスキップされていたら強制終了
        isSkipped: true,
        turn: state.turn + 1,
        board: state.board,
        color: flip(state.color),
        players: state.players,
        isInitialized: state.isInitialized,
      };
    case 'clear':
      return initialState;
    default:
      return state;
  }
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
  getAnalysis: () => {
    white: number;
    black: number;
    selectableFields: number[];
  };
};

const useOthello = create<State & Actions>((set, get) => ({
  state: initialState,
  gameMode: undefined,
  update: (fieldId: number) => {
    const stateBefore = get().state;

    set((state) => ({
      state: othelloReducer(state.state, { type: 'update', fieldId }),
    }));
    const stateAfter = get().state;

    const initialValue = [] as number[];
    const flipped = stateBefore.board.reduce((indexes, element, index) => {
      return element !== stateAfter.board[index] && index !== fieldId
        ? [...indexes, index]
        : indexes;
    }, initialValue);
    if (flipped.length === 0) {
      return;
    }

    set((state) => ({
      gameMode: state.gameMode ?? GAME_MODE.PVP,
    }));
  },
  skip: () => {
    set((state) => ({
      state: othelloReducer(state.state, { type: 'skip' }),
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
  getAnalysis: () => {
    const state = get().state;
    const board = Board.fromArray(state.board);
    return {
      white: board.countStone(COLOR_CODE.WHITE),
      black: board.countStone(COLOR_CODE.BLACK),
      selectableFields: board.selectableFields(state.color),
    };
  },
}));

export default useOthello;
