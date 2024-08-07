import { Board, BoardData } from "@models/Board/Board";
import { flip } from "@models/Board/Color";
import { randomBot } from "./Random";
import { COMPARISON_RESULT } from "@models/Shared/Comparison";
import { COLOR_CODE } from "@models/Board/Color";
import { BotMethod } from "../BotList";

type Options = {
  maxTimeOut: number;
};

export const TimeBasedMCTS: BotMethod = (
  board: BoardData,
  color: COLOR_CODE,
  options: Options = {
    maxTimeOut: 1000,
  }
) => {
  const baseBoard = Board.fromArray(board);

  // 選択する候補となるフィールドのリスト
  const selectableFields = baseBoard.selectableFields(color);

  if (selectableFields.length === 0) return null;

  // プレイアウトの結果を評価する
  const playOutResults = evaluateMoveInLimitedTime(
    selectableFields,
    baseBoard,
    color,
    options.maxTimeOut
  );
  const bestField = Array.from(playOutResults.entries()).reduce(
    (acc, [field, { win, total }]) => {
      const winningRate = win / total;
      return winningRate > acc.winningRate ? { field, winningRate } : acc;
    },
    { field: -1, winningRate: -1 }
  );

  console.log(Array.from(playOutResults.values()));
  console.log(
    "試行回数: " +
      Array.from(playOutResults.values()).reduce(
        (acc, { total }) => acc + total,
        0
      )
  );

  return bestField.field === -1 ? null : bestField.field;
};

const evaluateMoveInLimitedTime = (
  selectableFields: number[],
  board: Board,
  color: COLOR_CODE,
  maxTimeOut: number
): Map<number, { win: number; total: number }> => {
  const startTime = Date.now();
  let playOutResults: Map<number, { win: number; total: number }> = new Map();
  let count = 0;
  while (Date.now() - startTime < maxTimeOut) {
    count++;
    selectableFields.forEach((field) => {
      const result = playOut(board, color, field);
      const { win, total } = playOutResults.get(field) || { win: 0, total: 0 };
      playOutResults.set(field, {
        win: win + (result ? 1 : 0),
        total: total + 1,
      });
    });
    if (count === 100000) {
      console.log(count);
      break;
    }
  }
  return playOutResults;
};

/**
 * 交互にランダムに最後まで打ち合い、勝利したかどうかを返す
 * @param baseBoard
 * @param myColor
 * @param targetField
 * @returns
 */
const playOut = (
  baseBoard: Board,
  myColor: COLOR_CODE,
  targetField: number
): boolean => {
  // まずは指定されたフィールドに石を置く
  const result = baseBoard.update(targetField, myColor);
  return result.when({
    // 相手の手番からシミュレーション開始し、最終的に自分の色が多かったら勝ち
    success: (board) => randomWalk(board, flip(myColor), 0) === myColor,
    // 石を置けなかった場合は負け扱いする(起こり得ない)
    failure: () => false,
  });
};

/**
 * ランダムに石を打ち続け、最終的に数が多かった色を返す
 * @param board
 * @param color
 * @param skipCount
 * @returns
 */
const randomWalk = (
  board: Board,
  color: COLOR_CODE,
  skipCount: number
): COLOR_CODE | undefined => {
  // 盤面が埋まっている場合は勝敗を判定する
  if (board.isFulfilled()) {
    return judgeWinner(board, color);
  }

  // パスが連続した場合は引き分けなので勝者なし
  if (skipCount > 1) {
    return undefined;
  }

  // ランダムに石を置く場所を決定
  const randomMove = randomBot(board.toArray(), color);

  // 石を置く
  return board.update(randomMove ?? -1, color).when({
    success: (newBoard) => randomWalk(newBoard, flip(color), 0), // 盤面の更新に成功したらスキップカウントをリセットして相手の手番へ
    failure: () => randomWalk(board, flip(color), skipCount + 1), // 盤面の更新に失敗したらスキップカウントを増やして相手の手番へ
  });
};

const judgeWinner = (
  board: Board,
  color: COLOR_CODE
): COLOR_CODE | undefined => {
  switch (board.compareToOpponent(color)) {
    case COMPARISON_RESULT.EQUAL:
      return undefined;
    case COMPARISON_RESULT.GREATER:
      return color;
    case COMPARISON_RESULT.LESS:
      return flip(color);
  }
};
