"use client";

import useOthello from "../../../../../../dataflow/othello/useOthello";
import { COLOR_CODE } from "@models/Board/Color"
import Image from "next/image";
import PlayerBar from "./PlayerBar";

const PlayerInfo: React.FC = () => {
  const { state, players, gameMode } = useOthello();

  const colorText = state.color === COLOR_CODE.WHITE ? "白" : "黒";
  const theme = state.color === COLOR_CODE.WHITE ? "light" : "dark";
  const name = players.active.name;

  const data =
    players.active.type === "human"
      ? {
          message: (gameMode === "PVP" ? colorText: "あなた") + "のターンです",
          status: state.shouldSkip
            ? "置ける場所がありません"
            : state.error?.message ?? "",
        }
      : {
          message: "相手のターン",
          status: "思考中...",
        };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-2">{data.message}</h2>
      {state.isInitialized ? ( players.active.type === "human" ? <Image src="/icon_human.svg" alt="settings icon" width={30} height={30} /> : <Image src="/icon_bot.svg" alt="settings icon" width={30} height={30} />) : undefined}
      <p className="text-xs text-slate-400 animate-pulse h-4">{data.status}</p>
    </div>
  );
};

export default PlayerInfo;
