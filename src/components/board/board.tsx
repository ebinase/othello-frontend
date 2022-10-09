import type * as React from "react";
import useBoard from "../../hooks/use-board";
import Field from "./field";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
      <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
    </div>
  );
};

const Board: React.FC = () => {
  const [board, dispatch] = useBoard();

  return (
    <>
      <div className="h-96 w-96 bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
        {board.map((content: any, index: number) => {
          return (
            <Field key={index} fieldId={index} content={content} dispatcher={dispatch} />
          );
        })}
      </div>
    </>
  );
};
export default Board;
