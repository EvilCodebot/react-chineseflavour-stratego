import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";

export default class Flag extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/d/de/Eo_circle_yellow_white_letter-f.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Eo_circle_blue_white_letter-f.svg",
      0,
      "flag"
    );
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
