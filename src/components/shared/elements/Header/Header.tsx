"use client";

import useOthello from "@hooks/useOthelloWithAtom";

const Header: React.FC = () => {
  const { game } = useOthello();

  const handleNewGame = () => {
    if (confirm("プレイ中のゲーム情報が失われます。よろしいですか？")) {
      game.reset();
    }
  };

  return (
    <header>
      <div className="h-12 mx-[2rem] flex justify-between items-center">
        <div className="basis-2/5 flex items-center gap-1">
          <h1 className="font-bold text-slate-500 tracking-wide text-2xl">
            Othello
          </h1>
          <div
            className={
              "w-fit text-xs text-slate-400 rounded-sm px-2 py-0.5 " +
              "border border-slate-400"
            }
          >
            {game.mode === "PVP" ? "PVP" : "BOT"}
          </div>
        </div>
        <div className="basis-1/5 flex justify-center"></div>
        <div className="basis-2/5 flex justify-end gap-5 ">
          <button
            onClick={handleNewGame}
            className="text-slate-600 text-sm font-light"
          >
            RESET
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
