import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";
import redMajor from "../svg/major-red-6.svg";
import greenMajor from "../svg/major-green-6.svg";

export default class Major extends Piece {
  constructor(player) {
    super(player, player === 1 ? redMajor : greenMajor, 6, "a");
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
