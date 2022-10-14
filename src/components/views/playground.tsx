import Link from "next/link";
import useOthello from "../../hooks/use-othello";
import Board from "../parts/board";
import Stone from "../parts/stone";

type Props = {
  mode: "play" | "display";
};

const PlayGround: React.FC<Props> = (props) => {
  const [state, dispatch] = useOthello();

  return (
    <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
      {props.mode === "play" ? (
        <div className="h-10 w-96 m-6 flex justify-center">
          <div className="text-slate-500  h-9 w-full bg-slate-200 rounded-lg shadow-[4px_4px_3px_#eee,-3px_-3px_5px_#bebebe] flex justify-center items-center">
            {state.error?.message}
          </div>
        </div>
      ) : null}
      <Board board={state.board} dispatch={dispatch} />
      {props.mode === "play" ? (
        <div className="h-10 w-96 m-6 flex justify-between">
          <div className="h-9 w-9 bg-slate-200 rounded-lg shadow-[3px_3px_5px_#bebebe,-3px_-3px_5px_#ffffff] flex justify-center items-center">
            <Link href="/" passHref>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-slate-500"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="text-slate-500 mx-3 h-9 w-full bg-slate-200 rounded-lg shadow-[4px_4px_3px_#eee,-3px_-3px_5px_#bebebe] flex justify-center items-center">
            <div className="rounded-full h-10 w-10 bg-slate-200 shadow-[4px_4px_3px_#eee,-3px_-3px_5px_#bebebe] flex justify-center items-center">
              <Stone color={state.color} />
            </div>
          </div>
          <div
            className="h-9 w-9 bg-slate-200 rounded-lg p-1 shadow-[2px_2px_3px_#bebebe,-2px_-2px_2px_#ffffff] flex justify-center items-center"
            onClick={() => dispatch({ type: "skip" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-slate-500"
            >
              <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3"
            >
              <path
                fillRule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PlayGround;
