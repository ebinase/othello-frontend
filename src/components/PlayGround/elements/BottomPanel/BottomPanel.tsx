import React from "react";
import { rest, shoudSkip } from "../../hooks/logic/analyze";
import { GameState, OthelloDispatcher } from "../../hooks/useOthello";

const BottomPanel: React.FC<{
  state: GameState;
  dispatch: OthelloDispatcher;
}> = (props) => {
  const state = props.state;
  return (
    <>
      <div className="text-center h-full flex justify-center items-center">
        {shoudSkip(state.board, state.color) && rest(state.board) !== 0 ? (
          <button
            className="block bg-sky-400 text-slate-50 p-1 w-20 rounded-md"
            onClick={() => props.dispatch({ type: "skip" })}
          >
            Skip
          </button>
        ) : undefined}
      </div>
    </>
  );
};

export default BottomPanel;
