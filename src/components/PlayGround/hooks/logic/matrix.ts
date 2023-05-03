import { BoardData } from "../../elements/Board/Board";
import { FieldObject } from "../../elements/Board/Field";

type Line = FieldObject[];
type Matrix = Line[];

export const toMatrix = (board: BoardData, rowLength: number): Matrix => {
  let matrix = [];
  for (var i = 0; i < board.length; i += rowLength) {
    matrix.push(board.slice(i, i + rowLength));
  }
  return matrix;
};

export const directions = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

// FIXME: 迷走したやっつけ実装なのでリファクタリング
export const getLines = (board: BoardData, fieldId: number) => {
  const matrix = toMatrix(board, 8);
  const origin = { row: Math.floor(fieldId / 8), col: fieldId % 8 };

  return directions.map((direction) => {
    let tmp: FieldObject[] = [];
    let offset = 1;

    let currentCoord = getCurrentCoord(origin, direction, offset);
    while (
      currentCoord.row >= 0 &&
      currentCoord.row < 8 &&
      currentCoord.col >= 0 &&
      currentCoord.col < 8
    ) {
      tmp.push(matrix[currentCoord.row][currentCoord.col]);
      offset++;
      currentCoord = getCurrentCoord(origin, direction, offset);
    }

    return tmp;
  });
};

export const getCurrentCoord = (
  origin: any,
  direction: any,
  offset: number
) => {
  return {
    row: origin.row + direction.row * offset,
    col: origin.col + direction.col * offset,
  };
};
