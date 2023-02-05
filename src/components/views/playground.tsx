import useOthello from "../../hooks/use-othello";
import Board from "../parts/board";
import useAnimation from "../../hooks/animation/use-animation";

const PlayGround: React.FC = () => {
  // const [state, dispatch] = useOthello();
  const [frame] = useAnimation();
  return (
    <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
      <Board board={frame} dispatch={undefined} />
    </div>
  );
};

export default PlayGround;
