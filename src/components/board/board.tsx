import { type } from "os";
import type * as React from "react";
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

const fieldList: FieldParams[] = [
  { id: 0, flipped: false, set: false, setable: false, stone: { color: "02" } },
  { id: 1, flipped: false, set: false, setable: false, stone: { color: "01" } },
  { id: 2, flipped: false, set: false, setable: false, stone: { color: "01" } },
  { id: 3, flipped: false, set: false, setable: false, stone: null },
];

const Board: React.FC = () => {
  return (
    <div className="h-96 w-96 bg-slate-200 grid grid-cols-2 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
      {/* コンポジションを使って実装する */}
      {fieldList.map((field: FieldParams) => {
        return (
          <Field key={field.id} {...field} >
            {/*flipped set setable */}
            {field.stone !== null ? <Stone color={field.stone.color}></Stone> : null}
          </Field>
        );
      })}
    </div>
  );
};
export default Board;
