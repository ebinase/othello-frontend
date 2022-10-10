import { VFC } from "react";
import Stone from "./stone";


// TODO: メモ化
const Field: VFC<any> = (props: any) => {
  console.log('フィールド描画' + props.fieldId);
  
  return (
    <div className="bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center"
      onClick={() => {
        props.dispatcher({ type: "draw", fieldId: props.fieldId, color: 1 })
      }}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
