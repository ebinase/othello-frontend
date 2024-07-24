import React from "react";
import useOthello from "../../../../dataflow/othello/useOthello";

const BottomPanel: React.FC = () => {
  const { state, skip, players } = useOthello();
  const activePlayer = players.active;
  return (
    <div
      className="text-center h-full flex flex-col justify-start items-center"
    >
      <div className="pt-6">
        {state.shouldSkip ? (
          <button
            className="block bg-sky-400 text-slate-50 p-1 w-24 rounded-md"
            onClick={() => skip()}
          >
            {activePlayer.type === "human" ? "スキップ" : 'OK'}
          </button>
        ) : undefined}
      </div>
    </div>
  );
};

export default BottomPanel;
