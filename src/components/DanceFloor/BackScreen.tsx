import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  content: string;
  rows?: number;
  duration?: number;
};

const BackScreen: React.FC<Props> = ({ content, rows = 1, duration = 5 }) => {
  return (
    <motion.div
      className='w-full h-full p-5 bg-blue-400 text-white overflow-hidden whitespace-nowrap flex flex-col justify-center'
      style={{ textShadow: '0 0 10px #fff', boxShadow: '0 0 30px #fff' }}
      animate={{
          filter: [
            'brightness(100%) contrast(100%) hue-rotate(0deg)',
            'brightness(105%) contrast(105%) hue-rotate(60deg)',
            'brightness(115%) contrast(115%) hue-rotate(120deg)',
            'brightness(105%) contrast(105%) hue-rotate(180deg)',
            'brightness(100%) contrast(100%) hue-rotate(240deg)',
            'brightness(105%) contrast(105%) hue-rotate(300deg)',
            'brightness(115%) contrast(115%) hue-rotate(360deg)',
          ],
        }}
        transition={{
          duration: 10, // 1サイクルの時間（秒）
          ease: 'easeInOut', // アニメーションのイージングタイプ
          repeat: Infinity, // 無限に繰り返し
          repeatType: 'mirror', // 繰り返しのタイプ（"loop"、"mirror"、または"reverse"）
        }}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className='text-2xl sm:text-6xl font-bold tracking-[1rem]'
          initial={{ x: '150%' }}
          animate={{ x: '-150%' }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {content}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BackScreen;
