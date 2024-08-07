"use client";

import Board from "./elements/Board/Board";
import BottomPanel from "./elements/ActionPanel/BottomPanel";
import { useEffect } from "react";
import InfoPanel from "./elements/InfoPanel/InfoPanel";
import useOthello from "../../hooks/useOthello";

const PlayGround: React.FC = () => {
  const { activateBot, players, state } = useOthello();

  useEffect(() => {
     const activePlayer = players.active;
    // Botが行動可能な状態であればBotを起動
    if (activePlayer.type === "bot" && !state.shouldSkip) {
      const timeoutId = setTimeout(() => {
        activateBot();
        return () => {
          clearTimeout(timeoutId);
        };
      }, players.active.name === "Bot Lv.4" ? 100 : 500);  // Bot Lv.4は思考時間が長いため短めに設定
    }
  });

  return (
    <div className="h-full w-full flex flex-col">
      <div className="sm:basis-1/3 basis-[30%]">
        <InfoPanel />
      </div>

      <div className="sm:basis-1/3 flex justify-center">
        <Board />
      </div>
      <div className="sm:basis-1/3 flex-grow">
        <BottomPanel />
      </div>
    </div>
  );
};

export default PlayGround;
