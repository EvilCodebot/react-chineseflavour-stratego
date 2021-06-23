import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";

export default class Sergeant extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/c/cc/Eo_circle_yellow_number-3.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/3/3e/Eo_circle_blue_number-3.svg",
      3,
      "a"
    );
  }

  isMovePossible(src, dest, isDestEnemyOccupied, squares) {
    console.log("is move possible: " + squares);
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
