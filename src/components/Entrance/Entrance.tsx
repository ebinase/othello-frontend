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
        className='w-[25vmin] absolute bottom-6 sm:bottom-[-10px] right-2 z-[10000]'
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
        {/* 画像のすぐ上に文字が配置されるようにしている(改行できるように高さは余分に確保している) */}
        <div className='absolute -top-40 h-40  flex flex-col-reverse'>
          <p className='text-white font-bold'>{isOpen ? '？？？' : isFirstTime ? '扉をクリックすると開くよ' : 'おかえり〜'}</p>
        </div>
        <div className=''>
          <Image alt='dragon' src='/dragon_left.png' width={300} height={300} />
        </div>
      </motion.div>
    </div>
  );
};

export default Entrance;
