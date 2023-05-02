"use client";

import { useBot } from "../../hooks/bot/UseBot";
import useOthello from "../../hooks/othello/useOthello";
import Board from "../parts/board";
import { COLOR_CODES } from "../parts/stone";
import BottomPanel from "./BottomPanel";
import { useEffect } from "react";
import { shoudSkip } from "../../hooks/othello/logic/analyze";
import { MCTS } from "../../hooks/bot/methods/MCTS";
import InfoPanel from "../InfoPanel/InfoPanel";

const PlayGround: React.FC = () => {
  const [state, dispatch] = useOthello();
  const [calculate, changeBot] = useBot();

  useEffect(() => {
    if (state.color === COLOR_CODES.WHITE || state.isOver) return;
    const timeoutId = setTimeout(() => {
      if (shoudSkip(state.board, state.color)) {
        dispatch({ type: "skip" });
      }

      const result = MCTS(state.board, state.color);
      result
        ? dispatch({ type: "update", fieldId: result })
        : dispatch({ type: "skip" });

      return () => {
        clearTimeout(timeoutId);
      };
    }, 500);
  });

  return (
    <div className="h-full w-full flex flex-col">
      <div className="sm:basis-1/3 basis-1/4">
        <InfoPanel state={state} />
      </div>
      <div className="sm:basis-1/3 flex justify-center">
        <Board board={state.board} dispatch={dispatch} />
      </div>
      <div className="sm:basis-1/3 basis-1/12">
        <BottomPanel state={state} dispatch={dispatch} />
      </div>
    </div>
  );
};

export default PlayGround;
