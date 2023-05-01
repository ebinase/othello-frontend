import type { NextPage } from "next";
import PlayGround from "../src/components/views/playground";

const Home: NextPage = () => {
  return (
      <main className="w-full h-full flex justify-between items-center">
        <PlayGround />
      </main>
  );
};

export default Home;
