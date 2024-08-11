"use client";

import { COLOR_CODE } from "@models/Board/Color";
import PlayerBar from "./PlayerBar";
import useOthello from "@hooks/useOthelloWithAtom";

const PlayerInfo: React.FC = () => {
  const { players, game } = useOthello();

  const activePlayer = players.active;
  const colorText = activePlayer.color === COLOR_CODE.WHITE ? "白" : "黒";
  const theme = activePlayer.color === COLOR_CODE.WHITE ? "light" : "dark";

  const data =
    players.active.type === "human"
      ? {
          message: (game.mode === "PVP" ? colorText : "あなた") + "のターンです",
          status: activePlayer.action.type === "skip"
            ? "置ける場所がありません..."
            : "", // TODO: メッセージを表示可能にする
        }
      : {
          message: "相手のターンです",
          status: activePlayer.action.type === "skip" ? "スキップ！" : "思考中...",
        };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">{data.message}</h2>
      <div className="mb-1">
        <PlayerBar theme={theme}>{players.active.name}</PlayerBar>
      </div>
      <p className="text-xs text-slate-400 animate-pulse h-4">{data.status}</p>
    </div>
  );
};

export default PlayerInfo;
