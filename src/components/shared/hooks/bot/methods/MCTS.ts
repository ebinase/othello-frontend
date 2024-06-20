import { Board, BoardData, EMPTY_CODE } from "@models/Board/Board";
import { ColorCode, flip } from "../../../../PlayGround/elements/Board/Stone";
import {
  countFlipableStoneInLine,
  selectableFields,
} from "../../../../../dataflow/othello/logic/analyze";
import { randomBot } from "./Random";
import { directions, getCurrentCoord, getLines, toMatrix } from "@dataflow/othello/logic/matrix";
import { COMPARISON_RESULT } from "@models/Shared/Comparison";

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

  console.log(new Date().getTime() - start.getTime() + "ms");
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
    while (!Board.fromArray(board).isFulfilled()){
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
  
    
    return (
      Board.fromArray(board).compareToOpponent(myColor) ===
      COMPARISON_RESULT.GREATER
    );
  } catch (e) {
    // 勝敗がつかない場合は負け扱いにする
    return false;
  }
};

// FIXME: 将来的にはBoardクラスで置き換えたいが、Botのロジックが複雑なため旧core.tsの内容を移植した
const move = (board: BoardData, fieldId: number, color: ColorCode) => {
  if (board[fieldId] !== EMPTY_CODE) throw Error('置けないよ！');

  const scores = getLines(board, fieldId).map((line) => {
    return countFlipableStoneInLine(line, color);
  });
  if (
    scores.reduce((sum, score) => {
      return sum + score;
    }, 0) === 0
  )
    throw Error('ひとつも返せないよ！');
  return flipStone(board, fieldId, scores, color);
};

const flipStone = (
  board: BoardData,
  fieldId: number,
  scores: number[],
  color: ColorCode
) => {
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
};
