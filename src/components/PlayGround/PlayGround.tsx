"use client";

import Board from "./elements/Board/Board";
import BottomPanel from "./elements/BottomPanel/BottomPanel";
import { useEffect } from "react";
import { MCTS } from "../shared/hooks/bot/methods/MCTS";
import InfoPanel from "./elements/InfoPanel/InfoPanel";
import { COLOR_CODES } from "./elements/Board/Stone";
import useOthello from "../../dataflow/othello/othello";

const PlayGround: React.FC = () => {
  const { state, update, skip } = useOthello();

  useEffect(() => {
    if (state.color === COLOR_CODES.WHITE || state.isOver) return;
    const timeoutId = setTimeout(() => {
      const result = MCTS(state.board, state.color);
      result !== null ? update(result) : skip();

      return () => {
        clearTimeout(timeoutId);
      };
    }, 500);
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
