import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Board from "../components/board/board";
import useBoard from "../hooks/use-board";

const Home: NextPage = () => {
  const [board, dispatch] = useBoard();

  return (
    <div className={styles.container}>
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Othello
          <span className=" font-thin text-slate-500"> on </span>
          <span><a href="https://nextjs.org">Next.js</a></span>
        </h1>
        
        <h2 className={styles.title}>
          
        </h2>
        <h2 className="font-bold text-cyan-600">with Tailwind</h2>

        <div className="m-10">
          <Board board={board} dispatch={dispatch} />
        </div>
        <Link href="/play" passHref>  
          <button className="text-slate-500 hover:text-slate-300">🎮 Play(beta)</button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
