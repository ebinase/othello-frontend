export const COLOR_CODES = {
  WHITE: 1,
  BLACK: 2,
} as const;

export type ColorCode = typeof COLOR_CODES[keyof typeof COLOR_CODES];

export const flip: any = (color: any) => {
  return color === COLOR_CODES.WHITE ? COLOR_CODES.BLACK : COLOR_CODES.WHITE;
};

type Props = {
  color: ColorCode;
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
