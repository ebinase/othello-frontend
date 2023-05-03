"use client";

import { GameState } from "../../../../hooks/useOthello";
import { COLOR_CODES } from "../../../Board/Stone";
import PlayerBar from "./PlayerBar";

const PlayerInfo: React.FC<{ state: GameState }> = (props) => {
  const state = props.state;
  const data =
    state.color === COLOR_CODES.WHITE
      ? {
          message: "あなたのターンです",
          name: "You",
          theme: "light",
          status: "",
        }
      : {
          message: "相手のターンです",
          name: "Bot Lv.5",
          theme: "dark",
          status: "思考中...",
        };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">{data.message}</h2>
      <div className="mb-1">
        <PlayerBar theme={data.theme as "light" | "dark"}>
          {data.name}
        </PlayerBar>
      </div>
      <p className="text-xs text-slate-400 animate-pulse h-4">{data.status}</p>
    </div>
  );
};

export default PlayerInfo;
