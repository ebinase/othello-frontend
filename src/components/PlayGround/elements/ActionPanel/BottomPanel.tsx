import { BoardData, EMPTY_CODE } from "@models/Board/Board";
import React from "react";
import { shoudSkip } from "../../../../dataflow/othello/logic/analyze";
import useOthello from "../../../../dataflow/othello/othello";

// TODO: 残りの空白のマスの数はメタデータに含めるようにして、この関数を削除する
export const rest = (board: BoardData): number =>
  board.filter((field) => field === EMPTY_CODE).length;

const BottomPanel: React.FC = () => {
  const { state, skip } = useOthello();
  return (
    <div
      className="text-center h-full flex flex-col justify-start items-center"
    >
      <div className="pt-6">
        {shoudSkip(state.board, state.color) && rest(state.board) !== 0 ? (
          <button
            className="block bg-sky-400 text-slate-50 p-1 w-20 rounded-md"
            onClick={() => skip()}
          >
            Skip
          </button>
        ) : undefined}
      </div>
    </div>
  );
};

export default BottomPanel;
