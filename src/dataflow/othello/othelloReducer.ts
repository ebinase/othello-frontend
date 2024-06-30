import { BoardData } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';
import { Othello } from '@models/Game/Othello';

export type OthelloState = {
  isOver: boolean;
  isSkipped: boolean;
  turn: number;
  board: BoardData;
  color: COLOR_CODE;
  updatedFieldIdList: number[];
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

// 初期値
export const initialOthelloState: OthelloState = {
  ...Othello.initialize().toArray(),
  updatedFieldIdList: [],
};

export const othelloReducer = (
  state: OthelloState,
  action: Action
): OthelloState => {
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
            ...nextGame.toArray(),
            // TODO: ひっくり返された石の位置も含むようにする
            updatedFieldIdList: [action.fieldId],
          };
        },
        failure: (_) => {
          return {
            ...state,
            updatedFieldIdList: [],
          };
        },
      });
    case 'skip':
      const nextGame = othello.skip();
      return {
        ...nextGame.toArray(),
        updatedFieldIdList: [],
      };
    case 'clear':
      return initialOthelloState;
    default:
      return state;
  }
};
