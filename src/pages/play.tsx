import type { NextPage } from "next";
import Head from "next/head";
import PlayGround from "../components/views/playground";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-slate-200">
        <PlayGround/>
      </main>
    </>
  );
};

export default Home;
