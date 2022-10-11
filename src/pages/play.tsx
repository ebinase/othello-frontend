import type { NextPage } from "next";
import Head from "next/head";
import Board from "../components/board/board";
import useOthello from "../hooks/use-othello";

const Home: NextPage = () => {
  const [othello, dispatch] = useOthello();

  return (
    <>
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-slate-200">
        <div className="h-full w-full p-10 flex flex-1 justify-center flex-col items-center">
          <Board board={othello.board} dispatch={dispatch} />
            {/* https://heroicons.com/ */}
            <button className="hover:shadow-[4px_4px_3px_#bebebe,-4px_-4px_3px_#ffffff] m-4 px-5 py-1 text-slate-400 rounded-lg shadow-[2px_2px_1px_#bebebe,-2px_-2px_1px_#ffffff]" onClick={() => dispatch({type: 'clear'})}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
        </div>
      </main>
    </>
  );
};

export default Home;
