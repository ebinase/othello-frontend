import type { NextPage } from "next";
import Head from "next/head";
import Board from "../components/board/board";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-200">
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen px-8 py-16 flex flex-1 justify-center flex-col items-center ">
        <Board />
      </main>
    </div>
  );
};

export default Home;
