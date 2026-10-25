import Board from "./elements/Board/Board";
import BottomPanel from "./elements/ActionPanel/BottomPanel";
import { useEffect } from "react";
import InfoPanel from "./elements/InfoPanel/InfoPanel";
import useOthello from "@hooks/useOthelloWithAtom";

const PlayGround: React.FC = () => {
  const { activateGame } = useOthello();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      activateGame();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [activateGame]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="sm:basis-1/3 basis-[30%]">
        <InfoPanel />
      </div>

      <div className="sm:basis-1/3 flex justify-center">
        <Board />
      </div>
      <div className="sm:basis-1/3 grow">
        <BottomPanel />
      </div>
    </div>
  );
};

export default PlayGround;
