import { countFlipableStoneInLine } from "../../dataflow/othello/logic/analyze";
import { directions, getCurrentCoord, getLines, toMatrix } from "../../dataflow/othello/logic/matrix";
import { Result } from "../Shared/Result";

// Types
// TODO: ColorCodeやmatrixの処理を新たなクラスに切り出す
export const COLOR_CODES = {
  WHITE: 1,
  BLACK: 2,
} as const;

export type ColorCode = typeof COLOR_CODES[keyof typeof COLOR_CODES];

export const EMPTY_CODE = 0;
export type EmptyCode = typeof EMPTY_CODE;

export type FieldObject = ColorCode | EmptyCode;
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
      if ([27, 36].includes(index)) return COLOR_CODES.WHITE;
      if ([28, 35].includes(index)) return COLOR_CODES.BLACK;
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
    color: ColorCode
  ): Result<Board, InvalidPositionError> {
    // すでに石が置かれている場合は失敗
    if (this.board[fieldId] !== EMPTY_CODE) {
      return Result.failure(new InvalidPositionError());
    }

    // 一つも返せる石がない場合は失敗
    const scores = getLines(this.board, fieldId).map((line) => {
      return countFlipableStoneInLine(line, color);
    });
    if (scores.reduce((sum, score) => sum + score, 0) === 0) {
      return Result.failure(new InvalidPositionError());
    }

    // 更新後の盤面を返す
    const flippedBoard = Board.flipStone(this.board, fieldId, scores, color);
    return Result.success(Board.fromArray(flippedBoard));
  }

  private static flipStone(
    board: BoardData,
    fieldId: number,
    scores: number[],
    color: ColorCode
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
   * @returns boolean 盤面が完全に埋まっているかどうか
   */
  public isFulfilled(): boolean {
    return this.board.filter((field) => field === EMPTY_CODE).length === 0;
  }
}
