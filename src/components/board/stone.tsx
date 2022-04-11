import type { FC, ReactNode } from "react";

type ColorCode = "01" | "02";

type Props = {
  color: ColorCode;
};

const Stone: FC<Props> = (props) => {
  const color: string = props.color === "01" ? "bg-slate-50" : "bg-slate-900";

  return (
    <div
      className={
        "rounded-full h-full w-full shadow-[5px_5px_3px_#bebebe] " + color
      }
    ></div>
  );
};

export default Stone;
