import { Board, BoardData } from "@models/Board/Board";
import { COLOR_CODE, flip } from "@models/Board/Color";
import { Result } from "@models/Shared/Result";

export type OthelloValues = {
  turnNumber: number;
  board: BoardData;
  color: COLOR_CODE;
  skipCount: number;
};

export class Othello {
  private constructor(
    public readonly turnNumber: number,
    public readonly board: Board,
    public readonly color: COLOR_CODE,
    public readonly skipCount: number
  ) {}

  public static initialize(): Othello {
    return new Othello(1, Board.initialize(), COLOR_CODE.WHITE, 0);
  }

  public static reconstruct(values: OthelloValues): Othello {
    return new Othello(
      values.turnNumber,
      Board.fromArray(values.board),
      values.color,
      values.skipCount
    );
  }

  public move(fieldId: number): Result<Othello, Error> {
    if (this.isOver()) {
      return Result.failure(new Error("Game is over"));
    }

    // 更新
    return this.board.update(fieldId, this.color).when({
      success: (newBoard) =>
        Result.success(
          new Othello(this.turnNumber + 1, newBoard, flip(this.color), 0) // skipCountをリセット
        ),
      failure: () => Result.failure(new Error("Invalid position")),
    });
  }

  public skip(): Result<Othello, Error> {
    if (this.shoudSkip()) {
      return Result.success(
        new Othello(
          this.turnNumber + 1,
          this.board,
          flip(this.color),
          this.skipCount + 1
        )
      );
    } else {
      return Result.failure(new Error("Cannot skip"));
    }
  }

  public shoudSkip() {
    return (
      !this.isOver() && this.board.selectableFields(this.color).length === 0
    );
  }

  public isOver() {
    return this.skippedTooMuch() || !this.isContinuable();
  }

  public skippedTooMuch() {
    return this.skipCount > 1;
  }

  /**
   * ゲームを進行可能かどうかを返す
   */
  private isContinuable(): boolean {
    return (
      !this.board.isFulfilled() &&
      this.board.countStone(COLOR_CODE.WHITE) !== 0 &&
      this.board.countStone(COLOR_CODE.BLACK) !== 0
    );
  }

  public values() {
    return {
      turnNumber: this.turnNumber,
      board: this.board.toArray(),
      color: this.color,
      skipCount: this.skipCount,
    };
  }
}
