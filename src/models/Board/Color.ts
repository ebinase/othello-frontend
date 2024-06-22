export enum COLOR_CODE {
  WHITE = 1,
  BLACK = 2,
}

export function flip(color: COLOR_CODE): COLOR_CODE {
  return color === COLOR_CODE.WHITE ? COLOR_CODE.BLACK : COLOR_CODE.WHITE;
}