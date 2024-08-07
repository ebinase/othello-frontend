import React from "react";
import useOthello from "../../../../hooks/useOthello";

const BottomPanel: React.FC = () => {
  const { state, skip, players, reset, restart } = useOthello();
  const activePlayer = players.active;
  return (
    <div className="text-center h-full flex justify-center items-center">
      {state.shouldSkip && (
        <button
          className="block bg-sky-400 text-slate-50 p-1 w-24 rounded-md"
          onClick={() => skip()}
        >
          {activePlayer.type === "human" ? "スキップ" : "OK"}
        </button>
      )}
      {state.isOver && (
        <div className="flex justify-center items-center gap-4 text-xs">
          <button
            className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
            onClick={() => restart()}
          >
            最初から
          </button>
          <button
            className="shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff] text-slate-700 text-sm font-bold hover:text-slate-400 rounded-lg px-5 py-2 border-2 border-slate-200 flex gap-2 justify-center flex-shrink-0 basis-36"
            onClick={() => reset()}
          >
            終了
          </button>
        </div>
      )}
    </div>
  );
};

export default BottomPanel;
