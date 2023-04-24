import { useBot } from "../../hooks/bot/UseBot";
import useOthello from "../../hooks/othello/useOthello";
import Board from "../parts/board";
import { COLOR_CODES } from "../parts/stone";
import BottomPanel from "./BottomPanel";
import TopPanel from "./TopPanel";
import { useEffect } from "react";
import { shoudSkip } from "../../hooks/othello/logic/analyze";
import { MCTS } from "../../hooks/bot/methods/MCTS";

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
    <div className="h-full w-full flex flex-1 justify-center flex-col items-center">
      <TopPanel state={state} />
      <Board board={state.board} dispatch={dispatch} />
      <BottomPanel state={state} dispatch={dispatch} />
    </div>
  );
};

export default PlayGround;
