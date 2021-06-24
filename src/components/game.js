import React from "react";
import "../index.css";
import Board from "./board.js";
import FallenSoldierBlock from "./fallen-soldier-block.js";
import initialiseChessBoard from "../helpers/board-initialiser.js";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "white",
    };
  }

  handleClick(i) {
    const squares = [...this.state.squares];

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
            "Wrong selection. Choose player " + this.state.player + " pieces.",
        });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      } else {
        squares[i].style = {
          ...squares[i].style,
          backgroundColor: "RGB(111,143,114)",
        }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i,
        });
      }
      return;
    }

    squares[this.state.sourceSelection].style = {
      ...squares[this.state.sourceSelection].style,
      backgroundColor: "",
    };

    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again. 1",
        sourceSelection: -1,
      });
    } else {
      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];
      const isDestEnemyOccupied = Boolean(squares[i]);
      const isMovePossible = squares[this.state.sourceSelection].isMovePossible(
        this.state.sourceSelection,
        i,
        isDestEnemyOccupied,
        squares
      );

      if (isMovePossible) {
        if (squares[i] !== null) {
          if (squares[i].type === "flag") {
            if (this.state.player === 1) {
              // check if all black mines are gone

              let fallenMine = 0;

              for (let i = 0; i < this.state.blackFallenSoldiers.length; i++) {
                if (this.state.blackFallenSoldiers[i].type === "mine") {
                  fallenMine += 1;
                }
              }

              if (fallenMine === 3) {
                // if all mines are gone, flag can be attacked
                blackFallenSoldiers.push(squares[i]);

                squares[i] = squares[this.state.sourceSelection];
                squares[this.state.sourceSelection] = null;

                this.updateThis(
                  squares,
                  whiteFallenSoldiers,
                  blackFallenSoldiers
                );
                return;
              } else {
                return;
              }
            } else if (this.state.player === 2) {
              // check if all white mines are gone

              let fallenMine = 0;

              for (let i = 0; i < this.state.whiteFallenSoldiers.length; i++) {
                if (this.state.whiteFallenSoldiers[i].type === "mine") {
                  fallenMine += 1;
                }
              }

              if (fallenMine === 3) {
                // if all mines are gone, flag can be attacked
                whiteFallenSoldiers.push(squares[i]);

                squares[i] = squares[this.state.sourceSelection];
                squares[this.state.sourceSelection] = null;

                this.updateThis(
                  squares,
                  whiteFallenSoldiers,
                  blackFallenSoldiers
                );
                return;
              } else {
                return;
              }
            }
          }

          if (
            squares[i].type === "mine" &&
            squares[this.state.sourceSelection].type === "engineer"
          ) {
            //engineer live, mine die
            if (this.state.player === 1) {
              blackFallenSoldiers.push(squares[i]);
            } else if (this.state.player === 2) {
              whiteFallenSoldiers.push(squares[i]);
            }

            squares[i] = squares[this.state.sourceSelection];
            squares[this.state.sourceSelection] = null;

            this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);

            return;
          }

          if (
            squares[i].type === "mine" &&
            squares[this.state.sourceSelection].type === "bomb"
          ) {
            //mine die, bomb die

            if (this.state.player === 1) {
              whiteFallenSoldiers.push(squares[this.state.sourceSelection]);
              blackFallenSoldiers.push(squares[i]);
            } else if (this.state.player === 2) {
              whiteFallenSoldiers.push(squares[i]);
              blackFallenSoldiers.push(squares[this.state.sourceSelection]);
            }

            squares[i] = null;
            squares[this.state.sourceSelection] = null;

            this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);

            return;
          }

          if (squares[i].type === "mine") {
            //wrong selection, cant attack mine
            return;
          }

          if (
            squares[i].type === "bomb" ||
            squares[this.state.sourceSelection] === "bomb"
          ) {
            if (this.state.player === 1) {
              blackFallenSoldiers.push(squares[i]);
              whiteFallenSoldiers.push(squares[this.state.sourceSelection]);
            } else if (this.state.player === 2) {
              blackFallenSoldiers.push(squares[this.state.sourceSelection]);
              whiteFallenSoldiers.push(squares[i]);
            }

            squares[i] = null;
            squares[this.state.sourceSelection] = null;

            this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);
          } else if (
            squares[i].value === squares[this.state.sourceSelection].value
          ) {
            if (this.state.player === 1) {
              blackFallenSoldiers.push(squares[i]);
              whiteFallenSoldiers.push(squares[this.state.sourceSelection]);
            } else if (this.state.player === 2) {
              blackFallenSoldiers.push(squares[this.state.sourceSelection]);
              whiteFallenSoldiers.push(squares[i]);
            }

            squares[i] = null;
            squares[this.state.sourceSelection] = null;

            this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);
          } else if (
            // initiates attack, wins
            squares[i].value < squares[this.state.sourceSelection].value
          ) {
            if (this.state.player === 1) {
              blackFallenSoldiers.push(squares[i]);
            } else if (this.state.player === 2) {
              whiteFallenSoldiers.push(squares[i]);
            }

            squares[i] = squares[this.state.sourceSelection];
            squares[this.state.sourceSelection] = null;

            this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);
          } else if (
            // initiates attack, loses
            squares[i].value > squares[this.state.sourceSelection].value
          ) {
            if (this.state.player === 1) {
              whiteFallenSoldiers.push(squares[this.state.sourceSelection]);
            } else if (this.state.player === 2) {
              blackFallenSoldiers.push(squares[this.state.sourceSelection]);
            }

            squares[this.state.sourceSelection] = null;

            this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);
          }
        } else {
          // here is when your just moving
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;

          this.updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers);
        }
      } else {
        this.setState({
          status:
            "Wrong selection. Choose valid source and destination again. 2",
          sourceSelection: -1,
        });
      }
    }
  }

  updateThis(squares, whiteFallenSoldiers, blackFallenSoldiers) {
    let player = this.state.player === 1 ? 2 : 1;
    let turn = this.state.turn === "white" ? "black" : "white";

    this.setState((oldState) => ({
      sourceSelection: -1,
      squares,
      whiteFallenSoldiers: [
        ...oldState.whiteFallenSoldiers,
        ...whiteFallenSoldiers,
      ],
      blackFallenSoldiers: [
        ...oldState.blackFallenSoldiers,
        ...blackFallenSoldiers,
      ],
      player,
      status: "",
      turn,
    }));
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">
              {
                <FallenSoldierBlock
                  whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                  blackFallenSoldiers={this.state.blackFallenSoldiers}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
