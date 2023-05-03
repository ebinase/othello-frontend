import { Dispatch, SetStateAction, useState } from "react";
import { BotType, BOT_TYPES, Calculator, resolve } from "./BotTypes";

export const useBot = (): [Calculator, Dispatch<SetStateAction<BotType>>] => {
  const [botType, changeBot] = useState<BotType>(BOT_TYPES.RANDOM);

  return [resolve(botType), changeBot];
};
