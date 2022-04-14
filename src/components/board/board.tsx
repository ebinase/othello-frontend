import type * as React from "react";
import useBoard from "../../hooks/use-board";
import Field from "./field";
import Stone from "./stone";

type ColorCode = "01" | "02";

type Stone = {
  color: ColorCode;
};

type FieldParams = {
  id: number;
  flipped: boolean; // ひっくり返されたコマのあるマスかどうか
  set: boolean; // 前のターンに置かれたコマのあるマスかどうか
  setable: boolean; // 置くことができるマスかどうか
  stone: Stone | null;
};

// const emptyRow = [
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
// ];

// const fieldList: FieldParams[] = [
//   ...emptyRow,
//   ...emptyRow,
//   ...emptyRow,
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 0, flipped: false, set: false, setable: false, stone: { color: "02" } },
//   { id: 1, flipped: false, set: false, setable: false, stone: { color: "01" } },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 2, flipped: false, set: false, setable: false, stone: { color: "01" } },
//   { id: 0, flipped: false, set: false, setable: false, stone: { color: "02" } },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   { id: 3, flipped: false, set: false, setable: false, stone: null },
//   ...emptyRow,
//   ...emptyRow,
//   ...emptyRow,
// ];

const Board: React.FC = () => {
  const { board, isLoading, isError } = useBoard();

  if (isLoading || isError) {
    return (
      <div className="flex justify-center">
        <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
        <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
        <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="h-96 w-96 bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
      {/* TODO: fieldの型と仕様をしっかり決める */}
      {board.map((field: string | number, index: number) => {
        return (
          <Field key={index}>
            {field !== 0 ? (
              <Stone color={field}></Stone>
            ) : null}
          </Field>
        );
      })}
    </div>
  );
};
export default Board;
