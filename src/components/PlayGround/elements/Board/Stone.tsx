import { COLOR_CODE } from "@models/Board/Color";

export const flip: any = (color: any) => {
  return color === COLOR_CODE.WHITE ? COLOR_CODE.BLACK : COLOR_CODE.WHITE;
};

type Props = {
  color: COLOR_CODE;
  size?: string;
};

const Stone: React.FC<Props> = (props) => {
  const color: string = props.color === 1 ? "bg-slate-50" : "bg-slate-900";
  const size = props.size ?? "h-5/6 w-5/6";

  return (
    <div
      className={`rounded-full shadow-[2px_2px_1px_#bebebe] ${color} ${size} animate-flip-in`}
    />
  );
};

export default Stone;
