import { VFC } from "react";
import useOthello from "../../hooks/use-othello";
import Board from "../parts/board";

const PlayGround: VFC = () => {
    const [state, dispatch] = useOthello();

    return (
        <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
            <Board board={state.board} dispatch={dispatch} />
        </div>
    );
}

export default PlayGround