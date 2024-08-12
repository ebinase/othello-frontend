"use client";

import useOthello from "@hooks/useOthelloWithAtom";
import ResultBar from "./ResultBar";

const ResultInfo: React.FC = () => {
  const { game, players } = useOthello();

  let text = "";
  switch (game.result?.type) {
    case "resulted":
      text =
        game.mode === "PVP"
          ? players[game.result.color].name + " WIN!"
          : players[game.result.color].type === "human"
          ? "YOU WIN!"
          : "YOU LOSE...";
      break;
    case "draw":
      text = "DRAW";
      break;
    default:
      break;
  }

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">{text}</h2>
      <div className="mb-1">
        <ResultBar
          counts={{
            white: players.white.stones,
            black: players.black.stones,
          }}
        />
      </div>
    </div>
  );
};

export default ResultInfo;
