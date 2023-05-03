import type { NextPage } from "next";
import PlayGround from "../src/components/PlayGround/PlayGround";

const Home: NextPage = () => {
  return (
    <div className="h-full flex justify-between items-center">
      <PlayGround />
    </div>
  );
};

export default Home;
