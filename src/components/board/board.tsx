import type * as React from "react";
import useBoard from "../../hooks/use-board";
import Field from "./field";
import Stone from "./stone";

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
  const { board, isLoading, isError } = useBoard();

  return (
    <>
      <div className="mb-10">
        {isLoading || isError ? <Spinner /> : null}
      </div>

      <div className="h-96 w-96 bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
        {board.map((field: string, index: number) => {
          return (
            <Field key={index}>
              {field === "01" || field === "02" ? (
                <Stone color={field}></Stone>
              ) : null}
            </Field>
          );
        })}
      </div>
    </>
  );
};
export default Board;
