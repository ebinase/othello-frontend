import { flip } from '@models/Board/Color';
import { compareNumbers, COMPARISON_RESULT } from '@models/Shared/Comparison';
import {
  directions,
  getCurrentCoord,
  getLines,
  toMatrix,
} from '../../dataflow/othello/logic/matrix';
import { Result } from '../Shared/Result';
import { COLOR_CODE } from './Color';

// Types
export const EMPTY_CODE = 0;
export type EmptyCode = typeof EMPTY_CODE;

export type FieldObject = COLOR_CODE | EmptyCode;
export type FieldId = number;

export type BoardData = Array<FieldObject>;

// Errors
class InvalidPositionError extends Error {}

/**
 * 盤面を表すクラス
 * react側ではこのクラスを使わず、あくまでも盤面処理を行う関数のように扱う
 */
export class Board {
  private constructor(private readonly board: BoardData) {}

  public static initialize(): Board {
    const boardData = [...Array(64)].map((_, index) => {
      if ([27, 36].includes(index)) return COLOR_CODE.WHITE;
      if ([28, 35].includes(index)) return COLOR_CODE.BLACK;
      return EMPTY_CODE;
    });
    return new Board(boardData);
  }

  public static fromArray(boardData: BoardData): Board {
    return new Board(boardData);
  }

  public toArray(): BoardData {
    return this.board;
  }

  public update(
    fieldId: number,
    color: COLOR_CODE
  ): Result<Board, InvalidPositionError> {
    // すでに石が置かれている場合は失敗
    if (this.board[fieldId] !== EMPTY_CODE) {
      return Result.failure(new InvalidPositionError());
    }

    // 一つも返せる石がない場合は失敗
    // TODO: scoreMapで置き換えられそう
    const scores = getLines(this.board, fieldId).map((line) => {
      return this.countFlipableStoneInLine(line, color);
    });
    if (scores.reduce((sum, score) => sum + score, 0) === 0) {
      return Result.failure(new InvalidPositionError());
    }

    // 更新後の盤面を返す
    const flippedBoard = Board.flipStone(this.board, fieldId, scores, color);
    return Result.success(Board.fromArray(flippedBoard));
  }

  // TODO: わかりにくいのでリファクタリングしたい
  private static flipStone(
    board: BoardData,
    fieldId: number,
    scores: number[],
    color: COLOR_CODE
  ): BoardData {
    let matrix = toMatrix(board, 8);
    const origin = { row: Math.floor(fieldId / 8), col: fieldId % 8 };

    matrix[origin.row][origin.col] = color;

    directions.forEach((direction, index) => {
      for (let offset = 1; offset <= scores[index]; offset++) {
        let currentCoord = getCurrentCoord(origin, direction, offset);
        matrix[currentCoord.row][currentCoord.col] = color;
      }
    });
    return matrix.flat();
  }

  // ========================================
  // 分析用の関数郡
  // ========================================

  /**
   * 盤面が完全に埋まっているかどうか
   */
  public isFulfilled(): boolean {
    return this.board.filter((field) => field === EMPTY_CODE).length === 0;
  }

  /**
   * @returns number 指定された色の石の数
   */
  public countStone(color: COLOR_CODE): number {
    return this.board.filter((field) => field === color).length;
  }

  /**
   * 指定された色の数ともう一方の色の数を比較する
   */
  public compareToOpponent(color: COLOR_CODE): COMPARISON_RESULT {
    const myCount = this.countStone(color);
    const opponentCount = this.countStone(flip(color) as COLOR_CODE);

    return compareNumbers(myCount, opponentCount);
  }

  /**
   * 石を置くことが可能な場所のリストを返す
   */
  public selectableFields = (color: COLOR_CODE): number[] => {
    return this.scoreMap(this.board, color)
      .map((value, index) => (value > 0 ? index : undefined))
      .filter(
        (value): value is Exclude<typeof value, undefined> =>
          value !== undefined
      );
  };

  private scoreMap = (board: BoardData, color: COLOR_CODE) => {
    return board.map((_, fieldId) => this.getScore(board, color)(fieldId));
  };

  private getScore = (board: BoardData, color: COLOR_CODE) => {
    return (fieldId: number) => {
      if (board[fieldId] !== EMPTY_CODE) return 0;
      return getLines(board, fieldId)
        .map((line) => this.countFlipableStoneInLine(line, color))
        .reduce((sum, score) => sum + score, 0);
    };
  };

  // TODO: もう少し下のレイヤー寄りの処理なので別クラスに切り出したい
  // TODO: 行を表すlineと盤面全体のデータ型が同じBoardDataなので、別の型にしたい
  private countFlipableStoneInLine(line: BoardData, color: COLOR_CODE): number {
    if (line.length === 0) return 0;

    let score = 0;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === EMPTY_CODE) return 0;
      if (line[i] === color) return score;
      score++;
    }
    return 0;
  }
}
