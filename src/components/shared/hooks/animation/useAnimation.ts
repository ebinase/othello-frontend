import { useCallback, useEffect, useState } from "react";
import { BoardData } from "@models/Board/Board";
import slide from "./slides/default";
import { toMatrix } from "../../../../dataflow/othello/logic/matrix";
import {
  FieldObject,
  EMPTY_CODE,
} from "../../../PlayGround/elements/Board/Field";

const slideMatrix = slide.map((flatSlide: BoardData) => toMatrix(flatSlide, 8));
const combined = slideMatrix.reduce((prev, current) => prev.concat(current));

const next = (sequence: number): FieldObject[] => {
  const rest = combined.length - sequence;
  let current = combined.slice(
    sequence,
    rest >= 8 ? sequence + 8 : combined.length
  );
  if (rest < 8) {
    current = current.concat(combined.slice(0, 8 - rest));
  }

  return current.flat();
};

type State = {
  sequence: number;
  frame: FieldObject[];
};

const useAnimation = () => {
  const initialFrame: BoardData = [...Array(64)].map((_, index) => EMPTY_CODE);
  const [state, setState] = useState<State>({
    sequence: 0,
    frame: initialFrame,
  });

  const play = useCallback(
    () =>
      setState((state) => {
        const lastSequence = combined.length;
        const nextSequence =
          state.sequence < lastSequence ? state.sequence++ : 0;
        return {
          sequence: nextSequence,
          frame: next(nextSequence),
        };
      }),
    []
  );

  useEffect(() => {
    const timerId = setInterval(play, 500);
    return () => clearInterval(timerId);
  }, [play, state]);

  return [state.frame];
};

export default useAnimation;
