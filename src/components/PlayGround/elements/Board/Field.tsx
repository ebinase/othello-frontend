import { FieldId } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color";
import useOthello from "../../../../dataflow/othello/useOthello";
import Stone from "./Stone";


export const EMPTY_CODE = 0;
export type EmptyCode = typeof EMPTY_CODE;

export type FieldObject = COLOR_CODE | EmptyCode;

type Props = {
  fieldId: FieldId;
  content: COLOR_CODE;
  isSelectable: boolean;
};

const style =
  "bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center box-content";

// TODO: メモ化
const Field: React.FC<Props> = (props) => {
  const { update } = useOthello();
  return props.isSelectable ? (
    <button
      className={style}
      onClick={!props.content ? () => update(props.fieldId) : undefined}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </button>
  ) : (
    <div
      className={style}
      onClick={!props.content ? () => update(props.fieldId) : undefined}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
