"use client";

import useOthello from "../../../../../../dataflow/othello/othello";
import { COLOR_CODE } from "@models/Board/Color"
import PlayerBar from "./PlayerBar";

const PlayerInfo: React.FC = (props) => {
  const { state, players } = useOthello();

  const colorText = state.color === COLOR_CODE.WHITE ? "白" : "黒";
  const theme = state.color === COLOR_CODE.WHITE ? "light" : "dark";
  const name = players.active.name;

  const data =
    players.active.type === "human"
      ? {
          message: colorText + "プレイヤーのターンです",
          status: state.shouldSkip
            ? "置ける場所がありません"
            : state.error?.message ?? "",
        }
      : {
          message: "相手のターンです",
          status: "思考中...",
        };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">{data.message}</h2>
      <div className="mb-1">
        <PlayerBar theme={theme}>
          {name}
        </PlayerBar>
      </div>
      <p className="text-xs text-slate-400 animate-pulse h-4">{data.status}</p>
    </div>
  );
};

export default PlayerInfo;
