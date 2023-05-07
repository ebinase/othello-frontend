import React from "react";
import { rest, shoudSkip } from "../../../../dataflow/othello/logic/analyze";
import useOthello from "../../../../dataflow/othello/othello";

const BottomPanel: React.FC = () => {
  const { state, skip } = useOthello();
  return (
    <>
      <div className="text-center h-full flex justify-center items-center">
        {shoudSkip(state.board, state.color) && rest(state.board) !== 0 ? (
          <button
            className="block bg-sky-400 text-slate-50 p-1 w-20 rounded-md"
            onClick={() => skip()}
          >
            Skip
          </button>
        ) : undefined}
      </div>
    </>
  );
};

export default BottomPanel;
