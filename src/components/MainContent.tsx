'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import DanceFloor from './DanceFloor/DanceFloor';
import Entrance from './Entrance/Entrance';

type Place = 'entrance' | 'danceFloor';

const MainContent: React.FC = () => {
  const [current, setCurrent] = useState<Place>('entrance');
  const [isFirstTime, setIsFirstTime] = useState(true);

  return (
    <div className='h-screen w-screen'>
      {current === 'danceFloor' ? (
        <AnimatePresence mode='wait'>
          <motion.div
            key='danceFloor'
            initial={{ opacity: 0.7, scale: 0.1 }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            }}
            exit={{ opacity: 0.7, scale: 0.1 }}
            transition={{
              duration: 0.5,
              ease: 'linear',
            }}
          >
            <DanceFloor
              exit={() => {
                setCurrent('entrance');
              }}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence mode='wait'>
          <motion.div
            key='entrance'
            initial={isFirstTime ? {} : { opacity: 0.7, scale: 3 }} // 初回はアニメーションしない
            className='h-full w-full'
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0.7, scale: 3 }}
            transition={{
              duration: 0.5,
              ease: 'linear',
            }}
            onClick={() => {
              setIsFirstTime(false);
            }}
          >
            <Entrance
              enterDanceFloor={() => {
                setCurrent('danceFloor');
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default MainContent;
