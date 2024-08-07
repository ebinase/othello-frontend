import { BoardData } from '@models/Board/Board';
import { COLOR_CODE } from '@models/Board/Color';
import { randomBot } from './methods/Random';
import { StepBasedMCTS } from './methods/StepBasedMCTS';
import { TimeBasedMCTS } from './methods/TimeBasedMCTS';
import { WeakStepBasedMCTS } from './methods/WeakStepBasedMCTS';

export type BotMethod = (board: BoardData, color: COLOR_CODE) => number | null;

const BOT_LIST: Record<number, BotMethod> = {
  1: WeakStepBasedMCTS,
  2: randomBot,
  3: StepBasedMCTS,
  4: TimeBasedMCTS,
} as const;

export type BotLevel = 1 | 2 | 3 | 4;

export const botLevelList: BotLevel[] = Object.keys(BOT_LIST).map(Number) as BotLevel[];

export const resolveBotMethod = (botLevel: BotLevel) => BOT_LIST[botLevel];
