import { Children } from "react";

type Props = {
  counts: { white: number; black: number };
};

const TOTAL_STONES = 64;

const ResultBar: React.FC<Props> = ({ counts }) => {
  // 白と黒の割合を計算
  const stoneRates = {
    white: (counts.white / TOTAL_STONES) * 100,
    black: (counts.black / TOTAL_STONES) * 100,
    rest: ((TOTAL_STONES - counts.white - counts.black) / TOTAL_STONES) * 100,
  };
  // 割合から背景のグラデーションの幅を計算
  const bgStyles = `linear-gradient(90deg,
    rgb(255 255 255) ${stoneRates.white}%,
    rgb(0 0 0) ${stoneRates.white}%,
    rgb(203 213 225) ${stoneRates.white}%,
    rgb(203 213 225) ${stoneRates.white + stoneRates.rest}%,
    rgb(51 65 85) ${stoneRates.white + stoneRates.rest}%,
    rgb(51 65 85) 100%
  )`;
  return (
    <div className="mb-1">
      <div
        className="rounded-full p-2 w-40 shadow-xs flex justify-between"
        style={{ background: bgStyles }}
      >
        <p className="font-bold text-slate-700">{counts.white}</p>
        <p className="font-bold text-slate-50">{counts.black}</p>
      </div>
    </div>
  );
};

export default ResultBar;
