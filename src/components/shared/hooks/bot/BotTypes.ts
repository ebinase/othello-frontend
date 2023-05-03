import { BoardData } from "../../../PlayGround/elements/Board/Board";
import { FieldId } from "../../../PlayGround/elements/Board/Field";
import { ColorCode } from "../../../PlayGround/elements/Board/Stone";
import { randomBot } from "./methods/Random";

export const BOT_TYPES = {
  RANDOM: "RANDOM",
} as const;

export type BotType = typeof BOT_TYPES[keyof typeof BOT_TYPES];

export type Resolver = (botType: BotType) => Calculator;

export const resolve: Resolver = (botType) => {
  return randomBot;
};

export type Calculator = (board: BoardData, color: ColorCode) => FieldId | null;
