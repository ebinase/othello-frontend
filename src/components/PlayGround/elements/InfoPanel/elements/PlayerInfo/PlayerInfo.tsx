"use client";

import useOthello from "../../../../../../dataflow/othello/useOthello";
import { COLOR_CODE } from "@models/Board/Color"
import Image from "next/image";

const PlayerInfo: React.FC = () => {
  const { state, players, gameMode, skip } = useOthello();
  const activePlayer = players.active;

  const colorText = state.color === COLOR_CODE.WHITE ? "白" : "黒";

  const data =
    activePlayer.type === "human"
      ? {
          message: (gameMode === "PVP" ? colorText: "あなた") + "のターンです",
          status: activePlayer.allowedAction === 'skip'
            ? "置ける場所がありません..."
            : state.error?.message ?? "",
        }
      : {
        message: "相手のターンです",
        status: activePlayer.allowedAction === 'skip'
            ? "スキップ！"
            :  "思考中...",
        };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-2">{data.message}</h2>
      {state.isInitialized ? ( activePlayer.type === "human" ? <Image src="/icon_human.svg" alt="settings icon" width={30} height={30} /> : <Image src="/icon_bot.svg" alt="settings icon" width={30} height={30} />) : undefined}
      <p className="text-xs text-slate-400 animate-pulse h-4">{data.status}</p>
      {activePlayer.allowedAction === "skip" && <div className="p-5">
        <button
            className="bg-slate-50 text-slate-600 font-bold border-2 py-1 px-4 rounded-md shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]"
            onClick={skip}
          >
            {activePlayer.type === "human" ? "スキップ" : 'OK'}
          </button>
    </div>}
      </div>
  );
};

export default PlayerInfo;
