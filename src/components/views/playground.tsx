import { useEffect } from "react";
import useOthello from "../../hooks/use-othello";
import Board from "../parts/board";

const PlayGround: React.FC = () => {
  const [state, dispatch] = useOthello();

  useEffect(() => {
    let callIndex = 0;
    const intervalId = setInterval(() => {
      if (callIndex === 70) callIndex = 0;
      dispatch({ type: "smoothSlide", sequence: callIndex })
      console.log(`index:${callIndex++}`);
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
      <Board board={state.board} dispatch={dispatch} />
    </div>
  );
};

export default PlayGround;
