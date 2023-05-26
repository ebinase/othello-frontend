import React, { useState } from "react";
import { rest, shoudSkip } from "../../../../dataflow/othello/logic/analyze";
import useOthello from "../../../../dataflow/othello/othello";

const BottomPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { state, skip, undo, redo, canUndo, canRedo } = useOthello();
  return (
    <div
      className="text-center h-full flex flex-col justify-start items-center"
      onDoubleClick={() => {
        setIsVisible(!isVisible);
      }}
    >
      <div
        className={
          "mt-3 flex justify-between gap-36 " + (isVisible ? "" : "hidden")
        }
      >
        <button
          className={
            "w-10 h-10 bg-slate-100 rounded-full p-2 " +
            (canUndo() ? "" : "text-slate-400")
          }
          onClick={undo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <button
          className={
            "w-10 h-10 bg-slate-100 rounded-full p-2 " +
            (canRedo() ? "" : "text-slate-400")
          }
          onClick={redo}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
            />
          </svg>
        </button>
      </div>
      <div className="pt-6">
        {shoudSkip(state.board, state.color) && rest(state.board) !== 0 ? (
          <button
            className="block bg-sky-400 text-slate-50 p-1 w-20 rounded-md"
            onClick={() => skip()}
          >
            Skip
          </button>
        ) : undefined}
      </div>
    </div>
  );
};

export default BottomPanel;
