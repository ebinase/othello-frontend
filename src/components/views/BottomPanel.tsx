import React from "react";
import { rest, shoudSkip } from "../../hooks/othello/logic/analyze";
import { GameState, OthelloDispatcher } from "../../hooks/othello/useOthello";

const BottomPanel: React.FC<{
  state: GameState;
  dispatch: OthelloDispatcher;
}> = (props) => {
  const state = props.state;
  return (
    <>
      <div className="h-4 text-center p-3">
        {shoudSkip(state.board, state.color) && rest(state.board) !== 0 ? (
          <button onClick={() => props.dispatch({ type: "skip" })}>
            スキップ
          </button>
        ) : undefined}
      </div>
    </>
  );
};

export default BottomPanel;
