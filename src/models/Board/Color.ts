export enum COLOR_CODE {
  WHITE = 1,
  BLACK = 2,
}

export class Color {
  private constructor(private readonly COLOR_CODE: COLOR_CODE) {}

  public static fromCode(COLOR_CODE: COLOR_CODE): Color {
    return new Color(COLOR_CODE);
  }

  public static white() {
    return new Color(COLOR_CODE.WHITE);
  }

  public static black() {
    return new Color(COLOR_CODE.BLACK);
  }

  public opposite(): Color {
    const oppositeCode =
      this.COLOR_CODE === COLOR_CODE.WHITE
        ? COLOR_CODE.BLACK
        : COLOR_CODE.WHITE;
    return new Color(oppositeCode);
  }
}
