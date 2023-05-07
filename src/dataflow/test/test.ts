import { atom, useRecoilState } from "recoil";
import {
  ColorCode,
  COLOR_CODES,
} from "../../components/PlayGround/elements/Board/Stone";

const stoneState = atom<ColorCode>({
  key: "dataflow/stone",
  default: COLOR_CODES.WHITE,
});

export const useStone = () => {
  const [stone, setStone] = useRecoilState(stoneState);
  const opposite =
    stone === COLOR_CODES.WHITE ? COLOR_CODES.BLACK : COLOR_CODES.WHITE;
  const flip = () => setStone(opposite);
  return [stone, flip] as const;
};
