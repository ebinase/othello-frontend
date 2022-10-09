import { VFC } from "react";
import Stone from "./stone";



const Field: VFC<any> = (props: any) => {
  return (
    <div className="bg-slate-200 rounded-sm shadow-x2s flex items-center justify-center"
      onClick={() => {
        props.dispatcher({ type: "update", fieldId: props.fieldId, color: 1 })
      }}
    >
      {props.content ? <Stone color={props.content} /> : null}
    </div>
  );
};

export default Field;
