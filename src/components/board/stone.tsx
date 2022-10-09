import type { FC, ReactNode } from "react";

export type ColorCode = 1 | 2;

type Props = {
  color: ColorCode;
};

const Stone: FC<Props> = (props) => {
  const color: string = props.color === 1 ? "bg-slate-50" : "bg-slate-900";

  return (
    <div
      className={
        "rounded-full h-5/6 w-5/6 shadow-[2px_2px_1px_#bebebe] " + color
      }
    ></div>
  );
};

export default Stone;
