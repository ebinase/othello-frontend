import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Othello</title>
        <meta name="description" content="Othello app developed with next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Othello</h1>
        <p>on</p>
        <h2 className={styles.title}>
          <a href="https://nextjs.org">Next.js</a>
        </h2>
        <h2 className="font-bold text-cyan-600">with Tailwind</h2>

        <div>
          <Link href="/play">
            <a>
              <p className={styles.description}>🔧 Now Under Development 🔧</p>
            </a>
          </Link>
          <p className="text-center">
            今すぐプレイしたい方は
            <a
              href="https://ddd-othello.ebinas.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-cyan-600"
            >
              こちら
            </a>
          </p>
        </div>
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
