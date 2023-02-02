import React from "react";
import { OthelloDispatcher } from "../../hooks/use-othello";
import Stone, { ColorCode } from "./stone";

export const EMPTY_CODE = 0;
export type EmptyCode = typeof EMPTY_CODE;

export type FieldObject = ColorCode | EmptyCode;

type Props = {
  fieldId: number;
  content: ColorCode;
  dispatcher: OthelloDispatcher;
};

// TODO: メモ化
const Field: React.FC<Props> = (props) => {
  return (
    <div
      className="bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center"
      onClick={() => {
        props.dispatcher({ type: "draw", position: props.fieldId });
      }}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
