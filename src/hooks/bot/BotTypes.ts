import { BoardData } from "../../components/parts/board";
import { FieldId } from "../../components/parts/field";
import { ColorCode } from "../../components/parts/stone";
import { randomBot } from "./bots/RandomBot";

export const BOT_TYPES = {
  RANDOM: "RANDOM",
} as const;

export type BotType = typeof BOT_TYPES[keyof typeof BOT_TYPES];

export type Resolver = (botType: BotType) => Calculator;

export const resolve: Resolver = (botType) => {
  return randomBot;
};

export type Calculator = (board: BoardData, color: ColorCode) => FieldId;
