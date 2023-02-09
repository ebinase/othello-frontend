import React from "react";
import Stone, { COLOR_CODES } from "../parts/stone";
import { countStone, shoudSkip } from "../../hooks/othello/logic/analyze";
import { GameState, OthelloDispatcher } from "../../hooks/othello/useOthello";

const BottomPanel: React.FC<{ state: GameState, dispatch: OthelloDispatcher }> = (props) => {
  const state = props.state;
  return (
    <>
      <div className="h-4 text-center">
        {shoudSkip(state.board, state.color) ? (
          <button onClick={() => props.dispatch({ type: "skip" })}>スキップ</button>
        ) : undefined}
      </div>
    </>
  );
};

export default BottomPanel;
