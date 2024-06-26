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

/**
 * オセロの状態を更新するReducer
 * ターンをまたいでオセロのルールを司る
 * @param state
 * @param action
 * @returns
 */
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
        success: (next) => {
          return {
            ...next.toArray(),
            // TODO: flipされたfieldIdと石を置いたfieldIdを別にして返す
            updatedFieldIdList: [
              action.fieldId,
              ...getUpdatedFieldIdList(state.board, next.board.toArray()),
            ],
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
      const next = othello.skip();
      return {
        ...next.toArray(),
        updatedFieldIdList: [],
      };
    case 'clear':
      return initialOthelloState;
    default:
      return state;
  }
};

/**
 * ２つの盤面を比較して、更新されたfieldIdのリストを返す
 * @param before 
 * @param after 
 * @returns 
 */
const getUpdatedFieldIdList = (before: BoardData, after: BoardData) =>
  before.reduce((indexes, element, index) => {
    return element !== after[index]
      ? [...indexes, index]
      : indexes;
  }, [] as number[]);
