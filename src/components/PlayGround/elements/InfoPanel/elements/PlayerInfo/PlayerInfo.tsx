"use client";

import { COLOR_CODE } from "@models/Board/Color";
import PlayerBar from "./PlayerBar";
import useOthello from "@hooks/useOthelloWithAtom";
import BotIcon from "@components/shared/elements/Icon/BotIcon";
import PlayerIcon from "@components/shared/elements/Icon/PlayerIcon";

const PlayerInfo: React.FC = () => {
  const { players, game, message } = useOthello();

  const activePlayer = players.active;
  const colorText = activePlayer.color === COLOR_CODE.WHITE ? "白" : "黒";
  const theme = activePlayer.color === COLOR_CODE.WHITE ? "light" : "dark";
  // 背景とアイコンの色を逆にする
  const iconTheme = activePlayer.color === COLOR_CODE.WHITE ? "dark" : "light";

  const data =
    players.active.type === "human"
      ? {
          message:
            (game.mode === "PVP" ? colorText : "あなた") + "のターンです",
          status:
            activePlayer.action.type === "skip"
              ? "置ける場所がありません..."
              : message,
        }
      : {
          message: "相手のターンです",
          status:
            activePlayer.action.type === "skip" ? "スキップ！" : "思考中...",
        };

  return (
    <div className=" h-full text-center flex flex-col items-center sm:justify-center pb-6 sm:pt-6 pt-10">
      <h2 className="text-slate-600 font-bold text-xl mb-6">{data.message}</h2>
      <div className="mb-1">
        <PlayerBar theme={theme}>
          <div className="w-full flex justify-center gap-2">
            {players.active.type === "human" ? (
              <>
                  <PlayerIcon theme={iconTheme} />
                </>
            ) : (
                <>
                  <BotIcon theme={iconTheme} />
                </>
            )}
            {players.active.name}
          </div>
        </PlayerBar>
      </div>
      <p className="text-xs text-slate-400 animate-pulse h-4">{data.status}</p>
    </div>
  );
};

export default PlayerInfo;
