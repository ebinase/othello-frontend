"use client";

import { GameState } from "../../hooks/othello/useOthello";
import { COLOR_CODES } from "../parts/stone";

const InfoPanel: React.FC<{ state: GameState }> = (props) => {
  const state = props.state;
  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center p-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">
        {state.color === COLOR_CODES.WHITE
          ? "あなたのターンです"
          : "相手のターンです"}
      </h2>
      <div className="mb-1">
        {state.color === COLOR_CODES.WHITE ? (
          <div className="rounded-full border-4 border-sky-400 p-2 w-40 shadow-xs bg-white text-slate-600">
            You
          </div>
        ) : (
          <div className="rounded-full border-4 border-orange-500 p-2 w-40 shadow-xs bg-slate-700 text-slate-50">
            Bot Lv.5
          </div>
        )}
      </div>
      <p className="text-xs text-slate-400 animate-pulse">
        {state.color === COLOR_CODES.WHITE ? "" : "思考中..."}
      </p>
    </div>
  );
};

export default InfoPanel;
