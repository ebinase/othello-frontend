import { COLOR_CODE } from "@models/Board/Color";

type Props = {
  color: COLOR_CODE;
  size?: string;
};

const Stone: React.FC<Props> = (props) => {
  const color: string = props.color === COLOR_CODE.WHITE ? "bg-slate-50/60" : "bg-slate-900/40";
  const size = props.size ?? "h-5/6 w-5/6";

  return (
    <div
      className={`rounded-full shadow-[2px_2px_1px_#bebebe] ${color} ${size} animate-flip-in`}
    />
  );
};

export default Stone;
