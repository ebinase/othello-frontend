import useOthello from "@hooks/useOthelloWithAtom";
import { FieldId } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color";
import Stone from "./Stone";

type Props = {
  fieldId: FieldId;
  content: COLOR_CODE;
  isSelectable: boolean;
};

const style =
  "bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center box-content";

// TODO: メモ化
const Field: React.FC<Props> = (props) => {
  const { players, showMessage } = useOthello();
  const action = players.active.action;
  const update = (fieldId: FieldId) => {
    if (action?.type === "update") {
      action.update(fieldId);
    }
  };
  return props.isSelectable ? (
    <button className={style} onClick={() => update(props.fieldId)}>
      {props.content ? <Stone color={props.content} /> : null}
    </button>
  ) : (
    <div className={style} onClick={() => showMessage("置けませんでした！")}>
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
