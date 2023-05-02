"use client";

import { countStone } from "../../../../hooks/othello/logic/analyze";
import { GameState } from "../../../../hooks/othello/useOthello";
import { COLOR_CODES } from "../../../parts/stone";
import ResultBar from "./ResultBar";

const TOTAL_STONES = 64;

const ResultInfo: React.FC<{ state: GameState }> = (props) => {
  const state = props.state;
  const counts = {
    white: countStone(state.board, COLOR_CODES.WHITE),
    black: countStone(state.board, COLOR_CODES.BLACK),
  };
  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">
        {counts.white + counts.black === TOTAL_STONES
          ? counts.white > counts.black
            ? "You Win!!"
            : "You Lose..."
          : "Draw Game"}
      </h2>
      <div className="mb-1">
        <ResultBar counts={counts} />
      </div>
      <p className="text-xs text-slate-400 animate-pulse"></p>
    </div>
  );
};

export default ResultInfo;
