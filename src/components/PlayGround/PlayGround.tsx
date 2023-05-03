"use client";

import Board from "./elements/Board/Board";
import BottomPanel from "./elements/BottomPanel/BottomPanel";
import { useEffect } from "react";
import { shoudSkip } from "./hooks/logic/analyze";
import { MCTS } from "../shared/hooks/bot/methods/MCTS";
import InfoPanel from "./elements/InfoPanel/InfoPanel";
import { COLOR_CODES } from "./elements/Board/Stone";
import useOthello from "./hooks/useOthello";

const PlayGround: React.FC = () => {
  const [state, dispatch] = useOthello();

  useEffect(() => {
    if (state.color === COLOR_CODES.WHITE || state.isOver) return;
    const timeoutId = setTimeout(() => {
      if (shoudSkip(state.board, state.color)) {
        dispatch({ type: "skip" });
      }

      const result = MCTS(state.board, state.color);
      result !== null
        ? dispatch({ type: "update", fieldId: result })
        : dispatch({ type: "skip" });

      return () => {
        clearTimeout(timeoutId);
      };
    }, 500);
  });

  return (
    <div className="h-full w-full flex flex-col">
      <div className="sm:basis-1/3 basis-[30%]">
        <InfoPanel state={state} />
      </div>
      <div className="sm:basis-1/3 flex justify-center">
        <Board board={state.board} dispatch={dispatch} />
      </div>
      <div className="sm:basis-1/3 flex-grow">
        <BottomPanel state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default PlayGround;
