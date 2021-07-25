import React from "react";
import "../index.css";
import Square from "./square.js";
import Circle from "./circle.js";
import LineDiagonalTLBR from "../svg/roads/line-diagonal-tlbr.svg";
import LineDiagonalTRBL from "../svg/roads/line-diagonal-trbl.svg";
import LineVertical from "../svg/roads/line-vertical.svg";
import LineHorizontal from "../svg/roads/line-horizontal.svg";
import TrainHorizontal from "../svg/roads/train-horizontal.svg";
import TrainVertical from "../svg/roads/train-vertical.svg";

export default class Board extends React.Component {
  renderSquare(i, squareShade) {
    return (
      <Square
        key={i}
        keyVal={i}
        style={
          this.props.unflippedSquares[i]
            ? this.props.unflippedSquares[i].style
            : null
        }
        shade={squareShade}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderCircle(i, squareShade) {
    return (
      <Circle
        key={i}
        keyVal={i}
        style={
          this.props.unflippedSquares[i]
            ? this.props.unflippedSquares[i].style
            : null
        }
        shade={squareShade}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];

    let c = -1;
    let e = -1; // for train horizontal
    let f = -1;

    for (let i = 1; i < 24; i++) {
      const squareRows = [];

      if (isEven(i)) {
        // if even draw roads
        f++;

        if (f === 0 || f === 10) {
          for (let j = 1; j < 10; j++) {
            if (isEven(j)) {
              board.push(<div className="empty"></div>);
            } else {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineVertical}></img>
                </div>
              );
            }
          }
        } else if (f === 1 || f === 3 || f === 6 || f === 8) {
          for (let j = 1; j < 10; j++) {
            if (j === 1 || j === 9) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={TrainVertical}></img>
                </div>
              );
            } else if (j === 2 || j === 6) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineDiagonalTLBR}></img>
                </div>
              );
            } else if (j === 4 || j === 8) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineDiagonalTRBL}></img>
                </div>
              );
            } else {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineVertical}></img>
                </div>
              );
            }
          }
        } else if (f === 2 || f === 4 || f === 7 || f === 9) {
          for (let j = 1; j < 10; j++) {
            if (j === 1 || j === 9) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={TrainVertical}></img>
                </div>
              );
            } else if (j === 2 || j === 6) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineDiagonalTRBL}></img>
                </div>
              );
            } else if (j === 4 || j === 8) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineDiagonalTLBR}></img>
                </div>
              );
            } else {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineVertical}></img>
                </div>
              );
            }
          }
        } else if (f === 5) {
          for (let j = 1; j < 10; j++) {
            if (j === 1 || j === 5 || j === 9) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={TrainVertical}></img>
                </div>
              );
            } else {
              board.push(<div className="empty"></div>);
            }
          }
        }
      } else {
        let d = -1;
        c++;
        e++;

        for (let j = 1; j < 10; j++) {
          if (isEven(j)) {
            if (e === 1 || e === 5 || e === 6 || e === 10) {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={TrainHorizontal}></img>
                </div>
              );
            } else {
              board.push(
                <div className="road-container">
                  <img className="road-img" src={LineHorizontal}></img>
                </div>
              );
            }
          } else {
            d++;

            const squareShade =
              (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
                ? "light-square"
                : "dark-square";

            //11, 13, 17，21 ,23, 36，38，42，46，48 these are safehouse
            // if its safehouse render circle
            if (
              c * 5 + d === 11 ||
              c * 5 + d === 13 ||
              c * 5 + d === 17 ||
              c * 5 + d === 21 ||
              c * 5 + d === 23 ||
              c * 5 + d === 36 ||
              c * 5 + d === 38 ||
              c * 5 + d === 42 ||
              c * 5 + d === 46 ||
              c * 5 + d === 48
            ) {
              board.push(this.renderCircle(c * 5 + d, squareShade));
            } else {
              board.push(this.renderSquare(c * 5 + d, squareShade));
            }
          }
        }
      }
    }
    return <div className="game-board">{board}</div>;
  }
}

function isEven(num) {
  return num % 2 === 0;
}
