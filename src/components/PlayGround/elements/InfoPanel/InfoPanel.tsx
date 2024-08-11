"use client";

import useOthello from "@hooks/useOthelloWithAtom";
import PlayerInfo from "./elements/PlayerInfo/PlayerInfo";
import ResultInfo from "./elements/ResultInfo/ResultInfo";

const InfoPanel: React.FC = () => {
  const gameStatus = useOthello().game.status;

  // TODO: ゲームの初期化処理を適切なタイミングで表示できるようにする
  switch (gameStatus) {
    case "playing":
      return <PlayerInfo />;
    case "finished":
      return <ResultInfo />;
  }
};

export default InfoPanel;
