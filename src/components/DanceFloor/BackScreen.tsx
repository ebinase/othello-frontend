import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  content: string;
  rows?: number;
  duration?: number;
};

const BackScreen: React.FC<Props> = ({ content, rows = 1, duration = 5 }) => {
  return (
    <div className='w-full h-full p-5 bg-blue-500 text-white overflow-hidden whitespace-nowrap'>
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={`row-${i}`}
          className='text-6xl font-bold tracking-[1rem]'
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
            delay: i,
          }}
        >
          {content}
        </motion.div>
      ))}
    </div>
  );
};

export default BackScreen;
