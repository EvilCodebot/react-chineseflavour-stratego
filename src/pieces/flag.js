import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";
import redFlag from "../svg/flag-red.svg";
import greenFlag from "../svg/flag-green.svg";

export default class Flag extends Piece {
  constructor(player) {
    super(player, player === 1 ? redFlag : greenFlag, 0, "flag");
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
