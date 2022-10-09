import type { NextPage } from "next";
import Head from "next/head";
import Board from "../components/board/board";
import useBoard from "../hooks/use-board";

const Home: NextPage = () => {
  const [board, dispatch] = useBoard();

  return (
    <>
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-slate-200">
        <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
            <Board board={board} dispatch={dispatch} />
            <button className="hover:shadow-[4px_4px_3px_#bebebe,-4px_-4px_3px_#ffffff] m-4 px-5 py-1 text-slate-400 rounded-lg shadow-[2px_2px_1px_#bebebe,-2px_-2px_1px_#ffffff]" onClick={() => dispatch({type: 'clear'})}>
              clear
            </button>
        </div>
      </main>
    </>
  );
};

export default Home;
