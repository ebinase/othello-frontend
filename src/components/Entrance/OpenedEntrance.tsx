import { motion } from 'framer-motion';
import { useEffect } from 'react';
import useConfetti from '../../hooks/useConfetti';
import MirrorBall from '../DanceFloor/MirrorBall';

type Props = {
  enterDanceFloor: () => void;
};

const OpenedEntrance: React.FC<Props> = ({ enterDanceFloor }) => {
  const confetti = useConfetti();

  useEffect(() => {
    // canvasに対してcssのfilterをかける
    // z-indexを調整する
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.style.filter = 'brightness(0.5) contrast(0.5)';
      canvas.style.transform = 'scale(.6)';
    }
    confetti.showBoth();

    const timerId = setInterval(() => {
      setTimeout(() => {
        confetti.showLeft();
      }, Math.random() * 1500);
      setTimeout(() => {
        confetti.showRight();
      }, Math.random() * 1500);
    }, 1500);

    return () => {
      clearInterval(timerId);
      if (canvas) {
        canvas.style.filter = '';
        canvas.style.transform = '';
      }
    };
  }, [confetti]);

  return (
    <div className='pt-[20vh] pb-[10vh] bg-white/10 h-full w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center brightness-[.5] scale-[.6] sm:scale-[.2] blur-[2px] '>
        <MirrorBall />
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
