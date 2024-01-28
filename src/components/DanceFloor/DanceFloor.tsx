import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import useConfetti from '../../hooks/useConfetti';
import BackScreen from './BackScreen';
import MirrorBall from './MirrorBall';

const DanceFloor: React.FC = () => {
  const confetti = useConfetti();
  useEffect(() => {
    confetti.showBoth();

    const timerId = setInterval(() => {
      setTimeout(() => {
        confetti.showLeft();
      }, Math.random() * 1500);
      setTimeout(() => {
        confetti.showRight();
      }, Math.random() * 1500);
    }, 1500);

    return () => clearInterval(timerId);
  }, [confetti]);

  return (
    <div className='h-screen flex justify-start flex-col items-center'>
      <div className='flex justify-center'>
        <MirrorBall />
      </div>
      <div className='w-full'>
        <BackScreen content='🎉🎉🎉ヨシダハピバ２０２４🎉🎉🎉' rows={1}/>
      </div>
      <AnimatePresence>
        <motion.img
          key='/yoshida.png'
          src='/yoshida.png'
          className='h-1/4'
          animate={{
            y: ['15%', '5%', '15%'], // この配列で上下の動きを定義します。
          }}
          transition={{
            duration: 0.5, // 1サイクルの時間（秒）
            ease: 'easeInOut', // アニメーションのイージングタイプ
            repeat: Infinity, // 無限に繰り返し
            repeatType: 'loop', // 繰り返しのタイプ（"loop"、"mirror"、または"reverse"）
          }}
        />
        <motion.img key='/dj_table.png' src='/dj_table.png' className='h-1/4 z-10' />
        <motion.img
          key='/audience.png'
          src='/audience.png'
          className='h-1/4 z-10'
          animate={{
            y: ['15%', '5%', '15%'], // この配列で上下の動きを定義します。
          }}
          transition={{
            duration: 0.5, // 1サイクルの時間（秒）
            ease: 'easeInOut', // アニメーションのイージングタイプ
            repeat: Infinity, // 無限に繰り返し
            repeatType: 'loop', // 繰り返しのタイプ（"loop"、"mirror"、または"reverse"）
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default DanceFloor;
