import useOthello from "../../hooks/othello/useOthello";
import Board from "../parts/board";
import BottomPanel from "./BottomPanel";
import TopPanel from "./TopPanel";

const PlayGround: React.FC = () => {
  const [state, dispatch] = useOthello();

  return (
    <div className="h-full w-full flex flex-1 justify-center flex-col items-center">
      <TopPanel state={state} />
      <Board board={state.board} dispatch={dispatch} />
      <BottomPanel state={state} dispatch={dispatch}/>
    </div>
  );
};

export default PlayGround;
