import React from "react";
import Stone, { COLOR_CODES } from "../parts/stone";
import { countStone } from "../../hooks/othello/logic/analyze";
import { GameState } from "../../hooks/othello/useOthello";

const TopPanel: React.FC<{ state: GameState }> = (props) => {
  const state = props.state;
  if (!state.isOver) return <></>;

  return (
    // TODO: コンテナのサイズを固定する
    <div className="text-slate-500 p-4">
      <div className="font-semibold">Game Over</div>
      <div className="flex justify-center">
        <Stone color={COLOR_CODES.WHITE} size="h-4 w-4" />
        <Stone color={COLOR_CODES.BLACK} size="h-4 w-4" />
      </div>
      <div className="flex justify-center">
        {countStone(state.board, COLOR_CODES.WHITE)}
        <div>-</div>
        {countStone(state.board, COLOR_CODES.BLACK)}
      </div>
    </div>
  );
};

export default TopPanel;
