import useOthello from "../../hooks/use-othello";
import Board from "../parts/board";
import useAnimation from "../../hooks/animation/use-animation";
import { useState } from "react";

const PlayGround: React.FC = () => {
  const [state, dispatch] = useOthello();
  const [frame] = useAnimation();
  const [isPlaying, setMode] = useState(false);

  return (
    <>
      <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
        <Board board={isPlaying ? state.board : frame} dispatch={dispatch} />
      </div>
      <div className="h-4">
        {!isPlaying ? <button onClick={() => setMode(!isPlaying)} className="text-slate-500">play</button> : undefined}
      </div>
    </>
  );
};

export default PlayGround;
