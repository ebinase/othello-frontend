"use client";

import Board from "./elements/Board/Board";
import { useEffect } from "react";
import InfoPanel from "./elements/InfoPanel/InfoPanel";
import useOthello from "../../dataflow/othello/useOthello";

const PlayGround: React.FC = () => {
  const { activateBot, players } = useOthello();

  useEffect(() => {
    const activePlayer = players.active;
    // Botが行動可能な状態でない場合は処理を終了
    if (activePlayer.type !== "bot" || activePlayer.allowedAction !== "move") {
      return;
    }

    if (players.active.name !== "Bot Lv.3") {
      const timeoutId = setTimeout(() => {
        activateBot();
        return () => {
          clearTimeout(timeoutId);
        };
      }, 500);
    } else {
       const timeoutId = setTimeout(() => {
        activateBot();
        return () => {
          clearTimeout(timeoutId);
        };
      }, 100);
    }
  });

  return (
    <div className="h-full w-full flex flex-col">
      <div className="sm:basis-1/3 basis-[40%]">
        <InfoPanel />
      </div>
      <div className="sm:basis-1/3 flex justify-center">
        <Board />
      </div>
    </div>
  );
};

export default PlayGround;
