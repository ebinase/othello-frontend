import { BoardData } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color";
import { randomBot } from "./methods/Random";
import { StepBasedMCTS } from "./methods/StepBasedMCTS";
import { TimeBasedMCTS } from "./methods/TimeBasedMCTS";
import { WeakStepBasedMCTS } from "./methods/WeakStepBasedMCTS";

export type BotMethod = (board: BoardData, color: COLOR_CODE) => number | null;

const BOT_LIST: Record<number, [string, BotMethod]> = {
  1: ["Bot Lv.1", WeakStepBasedMCTS],
  2: ["Bot Lv.2", randomBot],
  3: ["Bot Lv.3", StepBasedMCTS],
  4: ["Bot Lv.4", TimeBasedMCTS],
} as const;

// FIXME: keyof typeof BOT_LISTではnumberになってしまうため手動で定義している
export type BotLevel = 1 | 2 | 3 | 4;

export const botLevelList: BotLevel[] = Object.keys(BOT_LIST).map(
  Number
) as BotLevel[];

export const resolveBotName = (botLevel: BotLevel) => BOT_LIST[botLevel][0];
export const resolveBotMethod = (botLevel: BotLevel) => BOT_LIST[botLevel][1];
