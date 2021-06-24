import Piece from "./piece.js";
import {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
} from "../helpers";

export default class Mine extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/8/86/Eo_circle_yellow_white_letter-m.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/3/30/Eo_circle_blue_white_letter-m.svg",
      0,
      "mine"
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
