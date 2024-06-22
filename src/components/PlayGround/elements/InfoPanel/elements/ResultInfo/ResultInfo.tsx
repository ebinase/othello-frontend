"use client";

import useOthello from "../../../../../../dataflow/othello/othello";
import { BoardData } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color"
import ResultBar from "./ResultBar";

const TOTAL_STONES = 64;

// FIXME: 結果はメタデータに持たせて以下の処理はすべて削除する
export const countStone = (board: BoardData, color: COLOR_CODE): number =>
  board.filter((field) => field === color).length;

const ResultInfo: React.FC = () => {
  const { state, gameMode } = useOthello();

  const counts = {
    white: countStone(state.board, COLOR_CODE.WHITE),
    black: countStone(state.board, COLOR_CODE.BLACK),
  };

  const getWinner = (board: BoardData): COLOR_CODE | undefined => {
    const counts = {
      white: countStone(state.board, COLOR_CODE.WHITE),
      black: countStone(state.board, COLOR_CODE.BLACK),
    };

    const isFinished = counts.white + counts.black === TOTAL_STONES;
    const isDraw = counts.white === counts.black;
    const isDominated = counts.white === 0 || counts.black === 0;

    if (isFinished) {
      // 全てのマスが埋まっている場合
      return isDraw
        ? undefined
        : counts.white > counts.black
        ? COLOR_CODE.WHITE
        : COLOR_CODE.BLACK;
    } else {
      // 途中で終了した場合
      return isDominated
        ? counts.white > counts.black
          ? COLOR_CODE.WHITE
          : COLOR_CODE.BLACK
        : undefined;
    }
  };

  const winner = getWinner(state.board);

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">
        {winner === undefined
          ? "DRAW"
          : gameMode === "PVP"
          ? state.players[winner].name + " WIN!"
          : state.players[winner].type === "human"
          ? "YOU WIN!"
          : "YOU LOSE..."}
      </h2>
      <div className="mb-1">
        <ResultBar counts={counts} />
      </div>
      <p className="text-xs text-slate-400 animate-pulse"></p>
    </div>
  );
};

export default ResultInfo;
