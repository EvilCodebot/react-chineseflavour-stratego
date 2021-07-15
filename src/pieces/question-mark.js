import Piece from "./piece.js";
import questionMark from "../svg/question-mark.svg";

export default class QuestionMark extends Piece {
  constructor(player) {
    super(player, questionMark, 0, "flag");
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
