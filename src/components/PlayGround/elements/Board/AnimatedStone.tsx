import { motion } from "framer-motion";
import Stone, { ColorCode } from "./Stone";

type Props = {
  color: ColorCode;
  size?: string;
};

const AnimatedStone: React.FC<Props> = (props) => {
  return (
    <motion.div
      className="h-full w-full rounded-full flex items-center justify-center"
      initial={{ boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
      animate={{
        boxShadow: [
          "0 0 0px rgba(0, 0, 0, 0)",
          "0 0 10px 5px rgba(125, 211, 252, 0.3)",
          "0 0 10px 20px rgba(125, 211, 252, 0.3)",
          "0 0 10px 5px rgba(125, 211, 252, 0.1)",
        ],
        zIndex: 1000,
        scale: [1.5, 1.5, 1.5, 1],
        filter: ["blur(3px)", "blur(3px)", "blur(1px)", "blur(0px)"],
      }}
      transition={{ duration: 1, times: [0, 0.2, 0.7, 1] }}
    >
      <Stone color={props.color} size={props.size} />
    </motion.div>
  );
};

export default AnimatedStone;
