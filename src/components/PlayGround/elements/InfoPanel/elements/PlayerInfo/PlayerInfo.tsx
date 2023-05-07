"use client";

import { shoudSkip } from "../../../../../../dataflow/othello/logic/analyze";
import useOthello from "../../../../../../dataflow/othello/othello";
import { COLOR_CODES } from "../../../Board/Stone";
import PlayerBar from "./PlayerBar";

const PlayerInfo: React.FC = (props) => {
  const { state } = useOthello();
  const data =
    state.color === COLOR_CODES.WHITE
      ? {
          message: "あなたのターンです",
          name: "You",
          theme: "light",
          status: shoudSkip(state.board, state.color) ? "置ける場所がありません" : "",
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
