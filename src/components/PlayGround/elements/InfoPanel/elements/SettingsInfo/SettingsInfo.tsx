"use client";

import useOthello, {
  GAME_MODE,
} from "../../../../../../dataflow/othello/useOthello";
import { COLOR_CODE } from "@models/Board/Color"

const SettingsInfo: React.FC = () => {
  const { initialize } = useOthello();


  const handlePvP = () => {
    initialize({ gameMode: GAME_MODE.PVP, players: ["Player1", "Player2"] });
  };

  const handlePvE = (name: string, playerColor: COLOR_CODE) => {
    initialize({
      gameMode: GAME_MODE.PVE,
      player: name,
      botLevel: 3,
    });
  };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-">NEW GAME</h2>
      <p className="text-xs text-slate-400 h-4">
        ゲームモードを選択してください
      </p>
      <div className="mt-6 flex flex-col gap-2">
          <button
            className="text-slate-700 text-sm font-bold hover:text-slate-400"
            onClick={handlePvP}
          >
            プレイヤー対戦
          </button>
        <button
          className="text-slate-700 text-sm font-bold hover:text-slate-400"
          onClick={() => handlePvE("Player1", COLOR_CODE.WHITE)}
        >
          ボット対戦
        </button>
      </div>
    </div>
  );
};

export default SettingsInfo;
