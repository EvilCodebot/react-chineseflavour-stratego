import Miner from "../pieces/1-miner";
import Cadet from "../pieces/2-cadet.js";
import Sergeant from "../pieces/3-sergeant";
import Lieutenant from "../pieces/4-lieutenant";
import Captain from "../pieces/5-captain";
import Major from "../pieces/6-major";
import Colonel from "../pieces/7-colonel";
import General from "../pieces/8-general";
import Marshal from "../pieces/9-marshal";

export default function initialiseChessBoard() {
  const squares = Array(60).fill(null);

  // let N = 5;

  // //create an array
  // for (var ar = [], i = 0; i < N; ++i) ar[i] = i;

  // ar = [1,1,2,2,3,3,4,4,5,5];

  // //shuffle it
  // for (var i = N - 1; i > 0; i--) {
  //   var j = Math.floor(Math.random() * (i + 1));
  //   var temp = ar[i];
  //   ar[i] = ar[j];
  //   ar[j] = temp;
  // }

  squares[0] = new Miner(2);
  squares[1] = new Cadet(2);
  squares[2] = new Lieutenant(2);
  squares[3] = new Captain(2);
  squares[4] = new General(2);

  squares[55] = new Miner(1);
  squares[56] = new Cadet(1);
  squares[57] = new Lieutenant(1);
  squares[58] = new Captain(1);
  squares[59] = new General(1);

  return squares;
}
