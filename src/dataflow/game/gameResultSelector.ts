import { othelloSelector } from "@dataflow/othelloAtom";
import { COLOR_CODE } from "@models/Board/Color";
import { Othello } from "@models/Game/Othello";
import { COMPARISON_RESULT } from "@models/Shared/Comparison";
import { atom } from "jotai";

type GameResult =
  | {
      type: "resulted";
      color: COLOR_CODE;
    }
  | {
      type: "draw";
    }
  | null;

export const gameResultSelector = atom<GameResult>((get) => {
  const game = Othello.reconstruct(get(othelloSelector));

  if (game.isOver()) {
    if (game.skippedTooMuch()) {
      return { type: "draw" };
    }

    switch (game.board.compareToOpponent(COLOR_CODE.WHITE)) {
      case COMPARISON_RESULT.GREATER:
        return {
          type: "resulted",
          color: COLOR_CODE.WHITE,
        };
      case COMPARISON_RESULT.LESS:
        return {
          type: "resulted",
          color: COLOR_CODE.BLACK,
        };
      case COMPARISON_RESULT.EQUAL:
        return { type: "draw" };
    }
  } else {
    return null;
  }
});
