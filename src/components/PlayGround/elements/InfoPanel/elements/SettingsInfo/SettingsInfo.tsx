"use client";

import useOthello, {
  GAME_MODE,
} from "../../../../../../dataflow/othello/useOthello";

const SettingsInfo: React.FC = () => {
  const { initialize } = useOthello();


  const handlePvP = () => {
    initialize({ gameMode: GAME_MODE.PVP, players: ["Player1", "Player2"] });
  };

  const handlePvE = (botLevel: number) => {
    initialize({
      gameMode: GAME_MODE.PVE,
      player: "You",
      botLevel,
    });
  };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl">NEW GAME</h2>
      <p className="text-xs text-slate-400 h-4">
        対戦相手を選択してください
      </p>
      <div className="mt-8 flex gap-5 justify-start items-center py-3 px-10 w-[100vw] overflow-x-scroll">
        <button
            className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
            onClick={handlePvP}
          >
            対人戦
        </button>
        <button
          className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
          onClick={() => handlePvE(1)}
        >
          Bot Lv.1
        </button>
        <button
          className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
          onClick={() => handlePvE(2)}
        >
          Bot Lv.2
        </button>
        <button
          className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
          onClick={() => handlePvE(3)}
        >
          Bot Lv.3
        </button>
      </div>
    </div>
  );
};

export default SettingsInfo;
