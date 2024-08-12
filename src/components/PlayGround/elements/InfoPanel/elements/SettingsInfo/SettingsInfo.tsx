"use client";

import useOthello from "@hooks/useOthelloWithAtom";
import { BotLevel, botLevelList } from "@models/Bot/BotList";
import { buildBotPlayer, buildHumanPlayer } from "@models/Player/Player";

const SettingsInfo: React.FC = () => {
  const { game } = useOthello();

  const handlePvP = () => {
    game.start(buildHumanPlayer("WHITE"), buildHumanPlayer("BLACK"));
  };

  const handlePvE = (botLevel: BotLevel) => {
    game.start(buildHumanPlayer("WHITE"), buildBotPlayer(botLevel));
  };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl">NEW GAME</h2>
      <p className="text-xs text-slate-400 h-4">対戦相手を選択してください</p>
      <div className=" flex gap-5 justify-start sm:justify-center items-center py-5 px-10 w-[100vw] overflow-x-scroll">
        <button
          className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
          onClick={handlePvP}
        >
          対人戦
        </button>
        {botLevelList.map((level) => (
          <button
            key={level}
            className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
            onClick={() => handlePvE(level)}
          >
            Bot Lv.{level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsInfo;
