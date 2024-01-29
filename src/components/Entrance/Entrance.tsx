import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import ClosedEntrance from './ClosedEntrance';
import OpenedEntrance from './OpenedEntrance';

type Props = {
  enterDanceFloor: () => void;
  isFirstTime: boolean;
};

const Entrance: React.FC<Props> = ({ enterDanceFloor, isFirstTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='h-full w-full'>
      {isOpen ? (
        <OpenedEntrance enterDanceFloor={enterDanceFloor} />
      ) : (
        <ClosedEntrance open={() => setIsOpen(true)} />
      )}
      <motion.div
        className='h-24 w-24 sm:h-40 sm:w-40 absolute bottom-6 sm:bottom-[-10px] right-2 z-[10000]'
        animate={{
          x: ['0%', '-15%', '-15%', '-30%', '-30%', '-15%', '-15%', '0%'],
          y: [
            '0%',
            '-5%',
            '-0%',
            '-0%',
            '-15%',
            '-0%',
            '-15%',
            '0%',
            '0%',
            '-5%',
            '-5%',
            '0%',
            '-0%',
            '-5%',
            '-15%',
            '0%',
          ],
        }}
        transition={{
          duration: 5, // 1サイクルの時間（秒）
          ease: 'easeInOut', // アニメーションのイージングタイプ
          repeat: Infinity, // 無限に繰り返し
          repeatType: 'loop', // 繰り返しのタイプ（"loop"、"mirror"、または"reverse"）
        }}
      >
        <div className='text-white font-bold text-center absolute -top-12'>
          <p>{isOpen ? '？' : isFirstTime ? '扉をクリックすると開くよ' : 'おかえり〜'}</p>
        </div>
        <div className='aspect-square'>
          <Image alt='dragon' src='/dragon_left.png' fill />
        </div>
      </motion.div>
    </div>
  );
};

export default Entrance;
