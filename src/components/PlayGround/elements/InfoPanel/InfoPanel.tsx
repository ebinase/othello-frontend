"use client";

import useOthello from "../../../../dataflow/othello/useOthello";
import PlayerInfo from "./elements/PlayerInfo/PlayerInfo";
import ResultInfo from "./elements/ResultInfo/ResultInfo";
import SettingsInfo from "./elements/SettingsInfo/SettingsInfo";

const InfoPanel: React.FC = () => {
  const { state } = useOthello();

  if (!state.isInitialized) {
    return <SettingsInfo />;
  }
  return state.isOver ? <ResultInfo /> : <PlayerInfo />;
};

export default InfoPanel;
