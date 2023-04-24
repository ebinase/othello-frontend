import { BoardData } from "../../../components/parts/board";
import { ColorCode, flip } from "../../../components/parts/stone";
import {
  countStone,
  rest,
  selectableFields,
} from "../../othello/logic/analyze";
import { move } from "../../othello/logic/core";
import { randomBot } from "./Random";

type Options = {
  maxPlayOut: number;
};

export const MCTS = (board: BoardData, color: ColorCode) => {
  const options: Options = {
    maxPlayOut: 500,
  };
  
  // 選択する候補となるフィールドのリスト
  const fields = selectableFields(board, color);

  if (fields.length === 0) return null;

  // ひとつのフィールドに対し何回プレイアウトを行うか決定
  const eachPlayOutCount = Math.floor(options.maxPlayOut / fields.length);

  const start = new Date();

  // プレイアウトの結果を評価する
  const playOutResults = fields.reduce(
    (acc, field) => {
      const score = evaluateMove(board, color, field, eachPlayOutCount);
      return score > acc.score ? { field, score } : acc;
    },
    { field: -1, score: -1 }
  );

  console.log((new Date().getTime() - start.getTime()) + 'ms');
  console.log(playOutResults);
  

  return playOutResults.field;
};

// プレイアウトの結果を評価する
const evaluateMove = (
  board: BoardData,
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

const playOut = (
  baseBoard: BoardData,
  myColor: ColorCode,
  targetField: number
): boolean => {
  // まずは指定されたフィールドに石を置く
  let board = move(baseBoard, targetField, myColor);
  // 相手の手番からシミュレーション開始
  let color = flip(myColor);
  let skipCount = 0;
  try {
    while (rest(board) !== 0) {
      const result = randomBot(board, color);
      if (result !== null) {
        board = move(board, result, color);
        skipCount = 0;
      } else {
        skipCount++;
      }
      color = flip(color);
      if (skipCount > 1) {
        throw new Error('パスが連続しています');
      }
    }
    return countStone(board, myColor) > countStone(board, flip(myColor));
  } catch (e) {
    // 勝敗がつかない場合は負け扱いにする
    return false;
  }
};
