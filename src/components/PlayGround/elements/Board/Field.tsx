import { FieldId } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color";
import Stone from "./Stone";
import { memo, useState } from "react";
import DummyStone from "./DummyStone";

type Props = {
  fieldId: FieldId;
  content: COLOR_CODE;
  isSelectable: boolean;
  currentColor: COLOR_CODE;
  update?: (fieldId: FieldId) => void;
  showMessage: (message: string) => void;
};

const style =
  "bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center box-content";

// eslintに怒られるため名前付き関数に変更している
const Field: React.FC<Props> = memo(function Field(props) {
  const [hover, setHover] = useState(false);
  return props.isSelectable ? (
    <button
      className={style}
      onClick={() => !!props.update && props.update(props.fieldId)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {props.content ? <Stone color={props.content} /> : hover ? <DummyStone color={props.currentColor} /> : null}
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
