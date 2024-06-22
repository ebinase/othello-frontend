import { Board, BoardData } from "@models/Board/Board";
import { ColorCode, flip } from "../../../../PlayGround/elements/Board/Stone";
import { randomBot } from "./Random";
import { COMPARISON_RESULT } from "@models/Shared/Comparison";

type Options = {
  maxPlayOut: number;
};

export const MCTS = (board: BoardData, color: ColorCode) => {
  const options: Options = {
    maxPlayOut: 500,
  };

  const baseBoard = Board.fromArray(board);

  // 選択する候補となるフィールドのリスト
  const selectableFields = baseBoard.selectableFields(color);

  if (selectableFields.length === 0) return null;

  // ひとつのフィールドに対し何回プレイアウトを行うか決定
  const eachPlayOutCount = Math.floor(
    options.maxPlayOut / selectableFields.length
  );

  const start = new Date();

  // プレイアウトの結果を評価する
  const playOutResults = selectableFields.reduce(
    (acc, field) => {
      const score = evaluateMove(baseBoard, color, field, eachPlayOutCount);
      return score > acc.score ? { field, score } : acc;
    },
    { field: -1, score: -1 }
  );

  console.log(new Date().getTime() - start.getTime() + "ms");
  console.log(playOutResults);

  return playOutResults.field;
};

// プレイアウトの結果を評価する
const evaluateMove = (
  board: Board,
  color: ColorCode,
  field: number,
  playOutCount: number
) => {
  let winCount = 0;
  for (let i = 0; i < playOutCount; i++) {
    winCount += playOut(board, color, field) ? 1 : 0;
  }

  return winCount / playOutCount;
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
  myColor: ColorCode,
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
const randomWalk = (board: Board, color: ColorCode, skipCount: number): ColorCode | undefined => {
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
  return board.update(randomMove ?? -1, color)
    .when({
      success: (newBoard) => randomWalk(newBoard, flip(color), 0),  // 盤面の更新に成功したらスキップカウントをリセットして相手の手番へ
      failure: () => randomWalk(board, flip(color), skipCount + 1), // 盤面の更新に失敗したらスキップカウントを増やして相手の手番へ
    });
}

const judgeWinner = (board: Board, color: ColorCode): ColorCode | undefined => {
  switch (board.compareToOpponent(color)) {
    case COMPARISON_RESULT.EQUAL:
      return undefined;
    case COMPARISON_RESULT.GREATER:
      return color;
    case COMPARISON_RESULT.LESS:
      return flip(color);
  }
};