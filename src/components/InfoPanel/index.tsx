import { GameState } from "../../hooks/othello/useOthello";
import PlayerInfo from "./elements/PlayerInfo/PlayerInfo";
import ResultInfo from "./elements/ResultInfo/ResultInfo";

const InfoPanel: React.FC<{ state: GameState }> = ({ state }) => {
  return state.isOver ? (
    <ResultInfo state={state}></ResultInfo>
  ) : (
    <PlayerInfo state={state}></PlayerInfo>
  );
};

export default InfoPanel;
