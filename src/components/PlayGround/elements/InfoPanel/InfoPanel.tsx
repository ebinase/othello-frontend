"use client";

import useOthello from "@hooks/useOthelloWithAtom";
import PlayerInfo from "./elements/PlayerInfo/PlayerInfo";
import ResultInfo from "./elements/ResultInfo/ResultInfo";
import { match } from "ts-pattern";
import SettingsInfo from "./elements/SettingsInfo/SettingsInfo";

const InfoPanel: React.FC = () => {
  const { game } = useOthello();

  // TODO: ゲームの初期化処理を適切なタイミングで表示できるようにする
  return match(game.status)
    .with("not_started", () => <SettingsInfo />)
    .with("playing", () => <PlayerInfo />)
    .with("finished", () => <ResultInfo />)
    .exhaustive();
};

export default InfoPanel;
