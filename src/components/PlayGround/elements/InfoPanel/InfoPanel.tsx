"use client";

import useOthello from "../../../../dataflow/othello/useOthello";
import PlayerInfo from "./elements/PlayerInfo/PlayerInfo";
import ResultInfo from "./elements/ResultInfo/ResultInfo";
import SettingsInfo from "./elements/SettingsInfo/SettingsInfo";

const InfoPanel: React.FC = () => {
  const { game: gameStatus } = useOthello();

  switch (gameStatus.status) {
    case "not_started":
      return <SettingsInfo />;
    case "playing":
      return <PlayerInfo />;
    case "finished":
      return <ResultInfo />;
  }
};

export default InfoPanel;
