import { motion } from "framer-motion";

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
    <motion.div
      className={`rounded-full ${color} ${size}`}
      initial={{ boxShadow: '0 0 0px rgba(0, 0, 0, 0)' }}
      animate={{
        boxShadow: [
          '0 0 0px rgba(0, 0, 0, 0)',
          '0 0 10px 5px rgba(125, 211, 252, 0.3)',
          '0 0 10px 20px rgba(125, 211, 252, 0.3)',
          '0 0 10px 5px rgba(125, 211, 252, 0.1)',
          '2px 2px 1px #bebebe',
        ],
        zIndex: 1000,
        scale: [1.5, 1.5, 1.5, 1, 1],
        filter: ["blur(3px)", "blur(3px)", "blur(1px)", "blur(0px)", "blur(0px)"],
      }}
      transition={{ duration: 1, times: [0,0.2, 0.7, 0.9, 1],  }}
    />
  );
};

export default Stone;
