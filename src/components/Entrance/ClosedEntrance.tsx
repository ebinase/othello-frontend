import { motion } from 'framer-motion';

const ClosedEntrance: React.FC<{ open: () => void }> = ({ open }) => {
  return (
    <motion.img key='gate_closed' src='/gate_closed.png' className='w-full h-full' onClick={open} />
  );
};

export default ClosedEntrance;
