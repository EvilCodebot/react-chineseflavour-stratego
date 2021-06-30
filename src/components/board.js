import React from "react";
import "../index.css";
import Square from "./square.js";
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
        style={this.props.squares[i] ? this.props.squares[i].style : null}
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

        // squareRows.push(<div className="emptyrow"></div>);

        if (f === 0 || f === 10) {
          for (let j = 1; j < 10; j++) {
            if (isEven(j)) {
              squareRows.push(<div className="road"></div>);
            } else {
              squareRows.push(<img className="road" src={LineVertical}></img>);
            }
          }
        } else if (f === 1 || f === 3 || f === 6 || f === 8) {
          for (let j = 1; j < 10; j++) {
            if (j === 1 || j === 9) {
              squareRows.push(<img className="road" src={TrainVertical}></img>);
            } else if (j === 2 || j === 6) {
              squareRows.push(
                <img className="road" src={LineDiagonalTLBR}></img>
              );
            } else if (j === 4 || j === 8) {
              squareRows.push(
                <img className="road" src={LineDiagonalTRBL}></img>
              );
            } else {
              squareRows.push(<img className="road" src={LineVertical}></img>);
            }
          }
        } else if (f === 2 || f === 4 || f === 7 || f === 9) {
          for (let j = 1; j < 10; j++) {
            if (j === 1 || j === 9) {
              squareRows.push(<img className="road" src={TrainVertical}></img>);
            } else if (j === 2 || j === 6) {
              squareRows.push(
                <img className="road" src={LineDiagonalTRBL}></img>
              );
            } else if (j === 4 || j === 8) {
              squareRows.push(
                <img className="road" src={LineDiagonalTLBR}></img>
              );
            } else {
              squareRows.push(<img className="road" src={LineVertical}></img>);
            }
          }
        } else if (f === 5) {
          for (let j = 1; j < 10; j++) {
            if (j === 1 || j === 5 || j === 9) {
              squareRows.push(<img className="road" src={TrainVertical}></img>);
            } else {
              squareRows.push(<div className="road"></div>);
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
              squareRows.push(
                <img className="road" src={TrainHorizontal}></img>
              );
            } else {
              squareRows.push(
                <img className="road" src={LineHorizontal}></img>
              );
            }
          } else {
            d++;

            const squareShade =
              (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
                ? "light-square"
                : "dark-square";

            // console.log(c * 5 + d)
            squareRows.push(this.renderSquare(c * 5 + d, squareShade));
          }
        }
      }

      board.push(
        <div className="board-row" key={i}>
          {squareRows}
        </div>
      );
    }
    return <div>{board}</div>;
  }
}

function isEven(num) {
  return num % 2 === 0;
}
