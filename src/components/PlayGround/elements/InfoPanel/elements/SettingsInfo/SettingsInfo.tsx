"use client";

import BotIcon from "@components/shared/elements/Icon/BotIcon";
import PlayersIcon from "@components/shared/elements/Icon/PlayersIcon";
import useOthello from "@hooks/useOthelloWithAtom";
import { BotLevel } from "@models/Bot/BotList";

const SettingsInfo: React.FC = () => {
  const { game, assets } = useOthello();
  const { buildHumanPlayer, buildBotPlayer, list: botList } = assets.bot;

  const handlePvP = () => {
    game.start(buildHumanPlayer("PLAYER"), buildHumanPlayer("PLAYER"));
  };

  const handlePvE = (botLevel: BotLevel) => {
    game.start(buildHumanPlayer("PLAYER"), buildBotPlayer(botLevel));
  };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl">NEW GAME</h2>
      <p className="text-xs text-slate-400 h-4">対戦相手を選択してください</p>
      <div className=" flex gap-5 justify-start sm:justify-center items-center py-5 px-10 w-[100vw] overflow-x-scroll">
        <button
          className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center items-center flex-shrink-0 basis-36"
          onClick={handlePvP}
        >
          <PlayersIcon />
          ふたりで
        </button>
        {botList.map((bot) => (
          <button
            key={bot.level}
            className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
            onClick={() => handlePvE(bot.level)}
          >
            <BotIcon />
            {bot.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsInfo;
