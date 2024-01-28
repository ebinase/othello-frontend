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

    return () => clearInterval(timerId);
  }, [confetti]);

  return (
    <>
      <div className='w-full h-full flex flex-col items-center brightness-[.5] scale-[.6] sm:scale-[.2] blur-[2px] bg-white/10'>
        <MirrorBall />
      </div>
      <motion.img key='gate_opened' src='/gate_opened.png' className='w-full h-full absolute top-0 left-0 z-[1000]' onClick={enterDanceFloor} />
    </>
  );
};

export default OpenedEntrance;
