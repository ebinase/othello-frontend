import { motion } from 'framer-motion';
import DanceFloor from '../DanceFloor/DanceFloor';

type Props = {
  enterDanceFloor: () => void;
};

const OpenedEntrance: React.FC<Props> = ({ enterDanceFloor }) => {
  return (
    <div className='bg-white/10 h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center brightness-[.9] scale-[.03] sm:scale-[.05] blur-lg animate-pulse'>
        <DanceFloor exit={() => { }} withConfetti={false} />
      </div>
      <motion.img
        key='gate_opened'
        src='/gate_opened.png'
        className='w-full h-full absolute top-0 left-0 z-[10000]'
      />
      <button
        className='
        text-white font-bold bg-black border-2 py-3 px-7 rounded-sm animate-pulse z-[10001]
        absolute bottom-20
        '
        onClick={enterDanceFloor}
      >
        中に入る
      </button>
    </div>
  );
};

export default OpenedEntrance;
