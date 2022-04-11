import type { FC, ReactNode } from "react";

type Props = {
  flipped: boolean;   // ひっくり返されたコマのあるマスかどうか
  set: boolean;       // 前のターンに置かれたコマのあるマスかどうか
  setable: boolean;   // 置くことができるマスかどうか
  children?: ReactNode;
};

const Field: FC<Props> = (props) => {
  return (
    <div className="bg-slate-200 rounded-sm shadow-x2s">{props.children}</div>
  );
};

export default Field;
