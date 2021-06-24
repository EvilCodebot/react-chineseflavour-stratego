import Engineer from "../pieces/1-engineer";
import Cadet from "../pieces/2-cadet.js";
import Sergeant from "../pieces/3-sergeant";
import Lieutenant from "../pieces/4-lieutenant";
import Captain from "../pieces/5-captain";
import Major from "../pieces/6-major";
import Colonel from "../pieces/7-colonel";
import General from "../pieces/8-general";
import Marshal from "../pieces/9-marshal";

import Bomb from "../pieces/bomb";
import Flag from "../pieces/flag";
import Mine from "../pieces/mine";

export default function initialiseChessBoard() {
  const squares = Array(60).fill(null);

  // fill array up with units, thus ensuring the correct number of each unit
  squares[0] = new Flag(1);
  squares[1] = new Marshal(1);
  squares[2] = new General(1);
  squares[3] = new Colonel(1);
  squares[4] = new Colonel(1);
  squares[5] = new Major(1);
  squares[6] = new Major(1);
  squares[7] = new Captain(1);
  squares[8] = new Captain(1);
  squares[9] = new Lieutenant(1);
  squares[10] = new Lieutenant(1);
  squares[12] = new Bomb(1);
  squares[14] = new Bomb(1);
  squares[15] = new Sergeant(1);
  squares[16] = new Sergeant(1);
  squares[18] = new Sergeant(1);
  squares[19] = new Cadet(1);
  squares[20] = new Cadet(1);
  squares[22] = new Cadet(1);
  squares[24] = new Engineer(1);
  squares[25] = new Engineer(1);
  squares[26] = new Engineer(1);
  squares[27] = new Mine(1);
  squares[28] = new Mine(1);
  squares[29] = new Mine(1);
  squares[30] = new Flag(2);
  squares[31] = new Marshal(2);
  squares[32] = new General(2);
  squares[33] = new Colonel(2);
  squares[34] = new Colonel(2);
  squares[35] = new Major(2);
  squares[37] = new Major(2);
  squares[39] = new Captain(2);
  squares[40] = new Captain(2);
  squares[41] = new Lieutenant(2);
  squares[43] = new Lieutenant(2);
  squares[44] = new Bomb(2);
  squares[45] = new Bomb(2);
  squares[47] = new Sergeant(2);
  squares[49] = new Sergeant(2);
  squares[50] = new Sergeant(2);
  squares[51] = new Cadet(2);
  squares[52] = new Cadet(2);
  squares[53] = new Cadet(2);
  squares[54] = new Engineer(2);
  squares[55] = new Engineer(2);
  squares[56] = new Engineer(2);
  squares[57] = new Mine(2);
  squares[58] = new Mine(2);
  squares[59] = new Mine(2);

  //11, 13, 17，21 ,23, 36，38，42，46，48 these are safehouse

  //shuffles it, safehouse must be null, using the Durstenfeld Shuffle
  for (var i = 60 - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    if (
      i !== 11 &&
      i !== 13 &&
      i !== 17 &&
      i !== 21 &&
      i !== 23 &&
      i !== 36 &&
      i !== 38 &&
      i !== 42 &&
      i !== 46 &&
      i !== 48 &&
      j !== 11 &&
      j !== 13 &&
      j !== 17 &&
      j !== 21 &&
      j !== 23 &&
      j !== 36 &&
      j !== 38 &&
      j !== 42 &&
      j !== 46 &&
      j !== 48
    ) {
      var temp = squares[i];
      squares[i] = squares[j];
      squares[j] = temp;
    }
  }

  return squares;
}
