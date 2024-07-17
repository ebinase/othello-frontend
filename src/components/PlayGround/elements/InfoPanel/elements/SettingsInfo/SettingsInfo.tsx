"use client";

import { useState } from "react";
import useOthello, {
  GAME_MODE,
} from "../../../../../../dataflow/othello/useOthello";
import { COLOR_CODE } from "@models/Board/Color"

const SettingsInfo: React.FC = (props) => {
  const { initialize } = useOthello();

  const handlePvP = () => {
    initialize({ gameMode: GAME_MODE.PVP, players: ["WHITE", "BLACK"] });
  };

  const handlePvE = () => {
    initialize({
      gameMode: GAME_MODE.PVE,
      player: "YOU",
      playerColor: COLOR_CODE.WHITE,
    });
  };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-">NEW GAME</h2>
      <p className="text-xs text-slate-400 h-4">
        ゲームモードを選択してください
      </p>
      <div className="mt-8 flex gap-5">
        <button
          className="text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2"
          onClick={handlePvE}
        >
          ひとりで遊ぶ
        </button>
          <button
            className="text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2"
            onClick={handlePvP}
          >
            ふたりで遊ぶ
          </button>
      </div>
    </div>
  );
};

export default SettingsInfo;
