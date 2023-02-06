import { useCallback, useEffect, useState } from 'react';
import { BoardData } from '../../components/parts/board';
import { EMPTY_CODE, FieldObject } from '../../components/parts/field';
import slide from './slides/default';

const toMatrix = (board: BoardData, rowLength: number): FieldObject[][] => {
  let matrix = [];
  for (var i = 0; i < board.length; i += rowLength) {
    matrix.push(board.slice(i, i + rowLength));
  }
  return matrix;
};

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
