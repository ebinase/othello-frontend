"use client";

import type { NextPage } from "next";
import PlayGround from "../src/components/PlayGround/PlayGround";
import Footer from "../src/components/shared/elements/Footer/Footer";
import Header from "../src/components/shared/elements/Header/Header";

const Home: NextPage = () => {
  return (
    <>
      <div className="h-[100dvh] flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="h-full flex justify-between items-center">
            <PlayGround />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
