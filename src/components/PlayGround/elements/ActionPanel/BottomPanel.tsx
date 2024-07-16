import React from "react";
import useOthello from "../../../../dataflow/othello/useOthello";

const BottomPanel: React.FC = () => {
  const { state, skip } = useOthello();
  return (
    <div
      className="text-center h-full flex flex-col justify-start items-center"
    >
      <div className="pt-6">
        {state.shouldSkip ? (
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
