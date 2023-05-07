'use client'

import type { NextPage } from "next";
import { RecoilRoot } from "recoil";
import PlayGround from "../src/components/PlayGround/PlayGround";
import Footer from "../src/components/shared/elements/Footer/Footer";
import Header from "../src/components/shared/elements/Header/Header";

const Home: NextPage = () => {
  return (
    <>
      <RecoilRoot>
        <div className="h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <div className="h-full flex justify-between items-center">
              <PlayGround />
            </div>
          </main>
        </div>
      </RecoilRoot>
      <Footer />
    </>
  );
};

export default Home;
