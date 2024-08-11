import { BotLevel, resolveBotName } from "@models/Bot/BotList";
import { resolve } from "path";

type BasePlayer = {
  name: string;
  type: 'human' | 'bot';
};

type Human = BasePlayer & {
  type: 'human';
};

type Bot = BasePlayer & {
  type: 'bot';
  level: BotLevel;
};

export type Player = Human | Bot;

// 人間プレイヤーの生成関数
export const buildHumanPlayer = (name: string): Human => {
  return {
    name,
    type: 'human'
  };
};

// ボットプレイヤーの生成関数
export const buildBotPlayer = (level: BotLevel): Bot => {
  return {
    name: resolveBotName(level),
    type: 'bot',
    level
  };
};