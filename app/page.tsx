"use client";

import type { NextPage } from "next";
import PlayGround from "../src/components/PlayGround/PlayGround";
import Footer from "../src/components/shared/elements/Footer/Footer";
import Header from "../src/components/shared/elements/Header/Header";
import { ThemeProvider } from "@material-tailwind/react";

const Home: NextPage = () => {
  return (
    <>
      <ThemeProvider>
        <div className="h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <div className="h-full flex justify-between items-center">
              <PlayGround />
            </div>
          </main>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default Home;
