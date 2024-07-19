"use client";

import { COLOR_CODE } from "@models/Board/Color";
import useOthello from "../../../../dataflow/othello/useOthello";
import Image from "next/image";

const Header: React.FC = () => {
  const { reset, gameMode, state } = useOthello();

  const headerColor = state.color === COLOR_CODE.WHITE ? "bg-slate-100 border-sky-500 text-slate-700" : "bg-slate-700 border-orange-500 text-slate-100";

  const handleNewGame = () => {
    if (confirm("ゲームをリセットします。よろしいですか？")) {
      reset();
    }
  };

  return (
    <header className={"w-full border-b-4 flex justify-center shadow-md shadow-[#bebebe] " + headerColor}>
      <div className="w-[90vmin] h-16 flex justify-between items-center">
        <div className="basis-2/5 flex items-center gap-1">
          <h1 className="font-bold tracking-wide text-2xl text-center" onClick={handleNewGame}>
            Othello
          </h1>
          
        </div>
        <div className="basis-1/5 flex justify-center">
        </div>
        <div className="basis-2/5 flex justify-end gap-5 ">
          <div
            className={"w-fit text-xs text-slate-400 rounded-sm px-2 py-0.5"}
          >
            {state.isInitialized ? (gameMode === "PVP" ? <Image src="/icon_pvp.svg" alt="settings icon" width={30} height={30} /> : <Image src="/icon_bot.svg" alt="settings icon" width={30} height={30} />) : undefined}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
