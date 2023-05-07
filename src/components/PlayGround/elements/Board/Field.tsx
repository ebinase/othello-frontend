import useOthello from "../../../../dataflow/othello/othello";
import Stone, { ColorCode } from "./Stone";

export const EMPTY_CODE = 0;
export type EmptyCode = typeof EMPTY_CODE;

export type FieldObject = ColorCode | EmptyCode;
export type FieldId = number;

type Props = {
  fieldId: FieldId;
  content: ColorCode;
};

// TODO: メモ化
const Field: React.FC<Props> = (props) => {
  const { update } = useOthello();
  return (
    <div
      className="bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center"
      onClick={!props.content ? () => update(props.fieldId) : undefined}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
