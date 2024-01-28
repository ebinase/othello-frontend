import { AnimatePresence, motion } from 'framer-motion';

const MirrorBall: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.img
        key='image1'
        src='/mirror_ball.png'
        className='w-1/4'
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
          duration: 3, // 1サイクルの時間（秒）
          ease: 'easeInOut', // アニメーションのイージングタイプ
          repeat: Infinity, // 無限に繰り返し
          repeatType: 'mirror', // 繰り返しのタイプ（"loop"、"mirror"、または"reverse"）
        }}
      />
    </AnimatePresence>
  );
};

export default MirrorBall;
