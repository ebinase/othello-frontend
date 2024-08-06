"use client";

import useOthello from "../../../../../../dataflow/othello/useOthello";
import ResultBar from "./ResultBar";

const ResultInfo: React.FC = () => {
  const { game, gameMode, players, state } = useOthello();

  let text = "";
  switch (game.result?.type) {
    case "resulted":
      text = gameMode === "PVP"
        ? players.selectByColor(game.result.winner).name + " WIN!"
        : players.selectByColor(game.result.winner).type === "human" ? "YOU WIN!" : "YOU LOSE...";
      break;
    case "draw":
      text = "DRAW";
      break;
  }

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">
        {text}
      </h2>
      <div className="mb-1">
        <ResultBar counts={{ white: players.white.score, black: players.black.score }} />
      </div>
    </div>
  );
};

export default ResultInfo;
