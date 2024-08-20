import { FieldId } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color";
import Stone from "./Stone";
import { memo } from "react";

type Props = {
  fieldId: FieldId;
  content: COLOR_CODE;
  isSelectable: boolean;
  update?: (fieldId: FieldId) => void;
  showMessage: (message: string) => void;
};

const style =
  "bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center box-content";

// eslintに怒られるため名前付き関数に変更している
const Field: React.FC<Props> = memo(function field(props) {
  return props.isSelectable ? (
    <button
      className={style}
      onClick={() => !!props.update && props.update(props.fieldId)}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </button>
  ) : (
    <div
      className={style}
      onClick={() => props.showMessage("置けませんでした！")}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
});

export default Field;
