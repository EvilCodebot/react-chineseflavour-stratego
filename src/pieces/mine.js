import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";
import redMine from "../svg/mine-red.svg";
import greenMine from "../svg/mine-green.svg";

export default class Mine extends Piece {
  constructor(player) {
    super(player, player === 1 ? redMine : greenMine, 0, "mine");
  }

  isMovePossible(src, dest, isDestEnemyOccupied, squares) {
    return null;
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */

  getSrcToDestPath(src, dest) {
    return [];
  }
}
