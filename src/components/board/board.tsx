import { type } from "os";
import type * as React from "react";
import Field from "./field";

type Stone = {
  color: string;
};

type FieldParams = {
  id: number;
  flipped: boolean; // ひっくり返されたコマのあるマスかどうか
  set: boolean; // 前のターンに置かれたコマのあるマスかどうか
  setable: boolean; // 置くことができるマスかどうか
  stone: Stone;
};

const fieldList: FieldParams[] = [
  { id: 0, flipped: false, set: false, setable: false, stone: { color: "●" } },
  { id: 1, flipped: false, set: false, setable: false, stone: { color: "◯" } },
  { id: 2, flipped: false, set: false, setable: false, stone: { color: "◯" } },
  { id: 3, flipped: false, set: false, setable: false, stone: { color: "●" } },
];

const Board: React.FC = () => {
  return (
    <div className="h-96 w-96 bg-slate-200 grid grid-cols-2 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
      {/* コンポジションを使って実装する */}
      {fieldList.map((field: FieldParams) => {
        return (
          <Field key={field.id}>
            {" "}
            {/*flipped set setable */}
            {field.stone.color}
          </Field>
        );
      })}
    </div>
  );
};
export default Board;
