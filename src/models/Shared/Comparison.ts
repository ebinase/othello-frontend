export enum COMPARISON_RESULT {
  LESS = -1,
  EQUAL = 0,
  GREATER = 1,
}

/**
 * 二つの数値を比較して、その結果を COMPARISON_RESULT として返す
 * @param a 基準となる数値
 * @param b 比較対象の数値
 * @returns COMPARISON_RESULT の値（LESS, EQUAL, GREATER）
 */
export function compareNumbers(a: number, b: number): COMPARISON_RESULT {
  if (a > b) {
    return COMPARISON_RESULT.GREATER;
  }
  if (a === b) {
    return COMPARISON_RESULT.EQUAL;
  }
  return COMPARISON_RESULT.LESS;
}
