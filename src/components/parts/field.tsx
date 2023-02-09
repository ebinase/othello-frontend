import React from "react";
import { OthelloDispatcher } from "../../hooks/othello/useOthello";
import Stone, { ColorCode } from "./stone";

export const EMPTY_CODE = 0;
export type EmptyCode = typeof EMPTY_CODE;

export type FieldObject = ColorCode | EmptyCode;

type Props = {
  fieldId: number;
  content: ColorCode;
  dispatcher?: OthelloDispatcher;
};

// TODO: メモ化
const Field: React.FC<Props> = (props) => {
  const dispatch = props.dispatcher;
  return (
    <div
      className="bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center"
      onClick={!props.content && !!dispatch ? () => dispatch({ type: "update", fieldId: props.fieldId }) : undefined}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
