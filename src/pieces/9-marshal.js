import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";

export default class Marshal extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/c/c1/Eo_circle_yellow_number-9.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/1/15/Eo_circle_blue_number-9.svg",
      9,
      "a"
    );
  }

  isMovePossible(src, dest, isDestEnemyOccupied, squares) {
    return (
      isNotInSafeHouse(squares, dest) &&
      isPathClean(squares[src].getSrcToDestPath(src, dest), squares) &&
      (isSameDiagonal(src, dest) ||
        isSameColumn(src, dest) ||
        isSameRow(src, dest))
    );
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */

  getSrcToDestPath(src, dest) {
    if (isSameDiagonal(src, dest)) {
      // if isSameDiagonal, no path need to be checked
      return [];
    }

    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (Math.abs(src - dest) % 5 === 0) {
      incrementBy = 5;
      pathStart += 5;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}
