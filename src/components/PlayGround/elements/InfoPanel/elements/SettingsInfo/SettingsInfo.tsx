"use client";

import { useState } from "react";
import useOthello, {
  GAME_MODE,
} from "../../../../../../dataflow/othello/othello";
import Stone, { ColorCode, COLOR_CODES } from "../../../Board/Stone";

const SettingsInfo: React.FC = (props) => {
  const { initialize } = useOthello();

  const [isPvE, setIsPvE] = useState(false);

  const handlePvP = () => {
    initialize({ gameMode: GAME_MODE.PVP, players: ["player1", "player2"] });
  };

  const handlePvE = (name: string, playerColor: ColorCode) => {
    initialize({
      gameMode: GAME_MODE.PVE,
      players: name,
      playerColor: playerColor,
    });
  };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-">NEW GAME</h2>
      <p className="text-xs text-slate-400 h-4">
        ゲームモードを選択してください
      </p>
      <div className="mt-6 flex flex-col gap-2">
        {isPvE ? undefined : (
          <button
            className="text-slate-700 text-sm font-bold hover:text-slate-400"
            onClick={handlePvP}
          >
            プレイヤー対戦
          </button>
        )}
        <button
          className="text-slate-700 text-sm font-bold hover:text-slate-400"
          onClick={() => setIsPvE(true)}
        >
          ボット対戦
        </button>
        {isPvE ? (
          <>
            <p className="text-xs text-slate-400 h-4">
              プレーする順番を選択してください
            </p>
            <div className="flex justify-center gap-5">
              <div
                className="flex gap-2 items-center"
                onClick={() => handlePvE("プレイヤー", COLOR_CODES.WHITE)}
              >
                <button className="text-sm text-slate-700">先攻</button>
              </div>
              <div
                className="flex gap-2 items-center"
                onClick={() => handlePvE("プレイヤー", COLOR_CODES.BLACK)}
              >
                <button className="text-sm text-slate-700">後攻</button>
              </div>
            </div>
          </>
        ) : undefined}
      </div>
    </div>
  );
};

export default SettingsInfo;
