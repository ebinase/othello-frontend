import { motion } from 'framer-motion';

type Props = {
  enterDanceFloor: () => void;
};

const OpenedEntrance: React.FC<Props> = ({enterDanceFloor}) => {
  return (
    <motion.img key='gate_opened' src='/gate_opened.png' className='w-full h-full' onClick={enterDanceFloor} />
  );
};

export default OpenedEntrance;
