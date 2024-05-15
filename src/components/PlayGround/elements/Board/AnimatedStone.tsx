import { motion } from "framer-motion";
import Stone, { ColorCode } from "./Stone";

type Props = {
  color: ColorCode;
  size?: string;
  isFlipped?: boolean;
  isNewStone?: boolean;
};

const AnimatedStone: React.FC<Props> = (props) => {
  return props.isNewStone ? (
    <motion.div
      className="h-full w-full rounded-full flex items-center justify-center"
      initial={{ boxShadow: "0 0 0px rgba(0, 0, 0, 0)" }}
      animate={{
        scale: [1.5, 1.5, 1.5, 1],
        filter: ["blur(3px)", "blur(3px)", "blur(1px)", "blur(0px)"],
      }}
      transition={{ times: [0, 0.2, 0.3, 0.7] }}
    >
      <Stone color={props.color} size={props.size} />
    </motion.div>
  ) : props.isFlipped ? (
    <motion.div
      className="h-full w-full rounded-full flex items-center justify-center"
      initial={{ rotateY: 0 }}
      animate={{
        rotateY: [0, 0, -80, -20, 0],
        opacity: [0.2, 0.2, 0.5, 1, 1],
      }}
      transition={{
        duration: 1,
        times: [0, 0.5, 0.6, 0.7, 1],
        ease: "easeInOut",
      }}
    >
      <Stone color={props.color} size={props.size} />
    </motion.div>
  ) : (
    <Stone color={props.color} size={props.size} />
  );
};

export default AnimatedStone;
