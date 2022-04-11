import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Board from "../components/board/board";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-200">
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Board />
      </main>
    </div>
  );
};

export default Home;
