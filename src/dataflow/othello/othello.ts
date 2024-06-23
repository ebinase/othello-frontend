import { BoardData } from '@models/Board/Board';
import {
  EMPTY_CODE,
  FieldId,
} from '../../components/PlayGround/elements/Board/Field';
import { flip } from '@models/Board/Color';
import { create } from 'zustand';
import { MCTS } from '../../components/shared/hooks/bot/methods/MCTS';
import { Board } from '../../models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';
import { Othello } from '@models/Game/Othello';

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
let initialGame = Othello.initialize();

const initialState: GameState = {
  isOver: false,
  isSkipped: false,
  turn: initialGame.turnNumber,
  board: initialGame.board.toArray(),
  color: initialGame.color,
  players: {
    [COLOR_CODE.WHITE]: initPlayer('WHITE'),
    [COLOR_CODE.BLACK]: initPlayer('BLACK'),
  },
  isInitialized: false,
};

const othelloReducer = (state: GameState, action: Action): GameState => {
  const othello = Othello.reconstruct(
    state.turn,
    state.board,
    state.color,
    state.isSkipped ? 1 : 0
  );
  switch (action.type) {
    case 'update':
      const result = othello.move(action.fieldId);
      return result.when({
        success: (nextGame) => {
          return {
            isOver: nextGame.isOver(),
            isSkipped: false,
            turn: nextGame.turnNumber,
            board: nextGame.board.toArray(),
            color: nextGame.color,
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
      const nextGame = othello.skip();
      return {
        isOver: nextGame.isOver(),
        isSkipped: true,
        turn: nextGame.turnNumber,
        board: nextGame.board.toArray(),
        color: nextGame.color,
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

// == Move History =======================
type UpdateMove = {
  type: 'update';
  putAt: FieldId;
  flipped: FieldId[];
};

type SkipMove = {
  type: 'skip';
};

type Move = UpdateMove | SkipMove;

type MoveHistory = { color: COLOR_CODE; move: Move };

const initialHistory: MoveHistory[] = [];

const apply =
  (direction: 'back' | 'forward') =>
  (board: BoardData, moveHistory: MoveHistory) => {
    const { color, move } = moveHistory;
    const oppositeColor = flip(color);
    return move.type === 'update'
      ? board
          .map((value, index) =>
            index === move.putAt
              ? direction === 'back'
                ? EMPTY_CODE
                : color
              : value
          )
          .map((value, index) =>
            move.flipped.includes(index)
              ? direction === 'back'
                ? oppositeColor
                : color
              : value
          )
      : board;
  };

type State = {
  state: GameState;
  gameMode: GAME_MODE | undefined;
  moveHistory: MoveHistory[];
  index: number;
};

type Actions = {
  update: (fieldId: number) => void;
  skip: () => void;
  reset: () => void;
  activateBot: () => void;
  initialize: (settings: GameSettings) => void;
  pushHistory: (color: COLOR_CODE, move: Move) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
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

    get().pushHistory(stateBefore.color, {
      type: 'update',
      putAt: fieldId,
      flipped,
    });

    set((state) => ({
      gameMode: state.gameMode ?? GAME_MODE.PVP,
    }));
  },
  skip: () => {
    set((state) => ({
      state: othelloReducer(state.state, { type: 'skip' }),
    }));
    const stateBefore = get().state;
    get().pushHistory(stateBefore.color, { type: 'skip' });
  },
  reset: () =>
    set({
      state: initialState,
      gameMode: undefined,
      moveHistory: [],
      index: -1,
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
  moveHistory: initialHistory,
  index: -1,
  pushHistory: (color, move) =>
    set((state) => {
      const newHistory = state.moveHistory
        .slice(0, state.index + 1) // 未来の要素を削除
        .concat({ color, move }); // 今回の追加要素を記録
      return {
        moveHistory: newHistory,
        index: newHistory.length - 1,
      };
    }),
  undo: () =>
    set((state) => {
      if (!get().canUndo()) {
        return state;
      }

      const prevIndex = state.index - 1;
      return {
        ...state,
        state: {
          ...state.state,
          turn: state.state.turn - 1,
          board: apply('back')(
            state.state.board,
            state.moveHistory[state.index]
          ),
          color: flip(state.state.color),
        },
        index: prevIndex,
      };
    }),
  redo: () =>
    set((state) => {
      if (!get().canRedo()) {
        return state;
      }

      const nextIndex = state.index + 1;
      return {
        ...state,
        state: {
          ...state.state,
          turn: state.state.turn + 1,
          board: apply('forward')(
            state.state.board,
            state.moveHistory[nextIndex]
          ),
          color: flip(state.state.color),
        },
        index: nextIndex,
      };
    }),
  canUndo: () => {
    return !get().state.isOver && get().index > -1;
  },
  canRedo: () => {
    const nextIndex = get().index + 1;
    const lastIndex = get().moveHistory.length - 1;
    return !get().state.isOver && nextIndex <= lastIndex;
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
