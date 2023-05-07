"use client";

import useOthello from "../../../../dataflow/othello/othello";
import PlayerInfo from "./elements/PlayerInfo/PlayerInfo";
import ResultInfo from "./elements/ResultInfo/ResultInfo";

const InfoPanel: React.FC = () => {
  const { state } = useOthello();
  return state.isOver ? <ResultInfo /> : <PlayerInfo />;
};

export default InfoPanel;
