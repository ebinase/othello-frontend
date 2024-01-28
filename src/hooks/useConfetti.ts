import confetti from 'canvas-confetti';

type Side = 'L' | 'R';

export const SIDE: { [key in Side]: Side } = {
  L: 'L',
  R: 'R',
} as const;

const showConfetti = (side: Side) => {
  confetti({
    // 激しいアニメーションが苦手なユーザーに対しては無効にする
    // See https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-reduced-motion
    disableForReducedMotion: true,
    // zIndex: -100,
    origin: {
      x: (Math.floor(Math.random() * 7) + 1) / 10 + (side === 'L' ? -0.3 : 0.3),
      y: Math.random() - 0.3,
    },
    startVelocity: 20,
    ticks: 400,
    spread: 360,
  });
};

const useConfetti = () => {
  return {
    show: showConfetti,
    showLeft: () => showConfetti(SIDE.L),
    showRight: () => showConfetti(SIDE.R),
    showBoth: () => {
      showConfetti(SIDE.L);
      showConfetti(SIDE.R);
    },
  };
};

export default useConfetti;
