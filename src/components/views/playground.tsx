import { VFC } from "react";
import useOthello from "../../hooks/use-othello";

type gameMode = "battle" | "draw" | "";


const PlayGround: VFC = () => {
    const [board, dispatch] = useOthello();


    return (
        <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
            <Board board={board} dispatch={dispatch} />
            <button className="hover:shadow-[4px_4px_3px_#bebebe,-4px_-4px_3px_#ffffff] m-4 px-5 py-1 text-slate-400 rounded-lg shadow-[2px_2px_1px_#bebebe,-2px_-2px_1px_#ffffff]" onClick={() => dispatch({ type: 'clear' })}>
                clear
            </button>
        </div>
    );
}

export default PlayGround