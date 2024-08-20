import { BoardData } from "@models/Board/Board";
import { COLOR_CODE } from "@models/Board/Color";
import { randomBot } from "./methods/Random";
import { StepBasedMCTS } from "./methods/StepBasedMCTS";
import { TimeBasedMCTS } from "./methods/TimeBasedMCTS";
import { WeakStepBasedMCTS } from "./methods/WeakStepBasedMCTS";

// FIXME: keyof typeof BOT_LISTではnumberになってしまうため手動で定義している
export type BotLevel = 1 | 2 | 3 | 4;
export type BotMethod = (board: BoardData, color: COLOR_CODE) => number | null;

type BotConfig = {
  level: BotLevel;
  name: string;
  method: BotMethod;
}[];

export const BOT_CONFIG: BotConfig = [
  { level: 1, name: "さいじゃく", method: WeakStepBasedMCTS },
  { level: 2, name: "よわい", method: randomBot },
  { level: 3, name: "つよめ", method: StepBasedMCTS },
  { level: 4, name: "つよい", method: TimeBasedMCTS },
] as const;

export const botLevelList: BotLevel[] = BOT_CONFIG.map((bot) => bot.level);

const findBot = (level: BotLevel) =>
  BOT_CONFIG.find((bot) => bot.level === level) ?? BOT_CONFIG[0];
export const resolveBotName = (botLevel: BotLevel) => findBot(botLevel).name;
export const resolveBotMethod = (botLevel: BotLevel) =>
  findBot(botLevel).method;
