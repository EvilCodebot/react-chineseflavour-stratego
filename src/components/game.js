import React from "react";
import "../index.css";
import Board from "./board.js";
import FallenSoldierBlock from "./fallen-soldier-block.js";
import {initialiseChessBoard, initialiseUnFlippedSquares} from "../helpers/board-initialiser.js";
import RulesModal from "./rules-modal.js";


let squaresState = Array(60).fill(false); // used to store whether if squares has been flipped or not

// Game component maintains the board of unflippedSquares filled with pieces, and handles turn and move of both players
export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      unflippedSquares: initialiseUnFlippedSquares(),
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "red",

      // rule modal pops up when user first enters website, start at page 1
      modalShow: true,
      pageNumber: 1,
    };
  }

  handleClick(i) {
    const unflippedSquares = [...this.state.unflippedSquares];

    //11, 13, 17，21 ,23, 36，38，42，46，48 are safehouse

    squaresState[11] = true;
    squaresState[13] = true;
    squaresState[17] = true;
    squaresState[21] = true;
    squaresState[23] = true;
    squaresState[36] = true;
    squaresState[38] = true;
    squaresState[42] = true;
    squaresState[46] = true;
    squaresState[48] = true;

    // checks if current clicked on square is flipped or not
    if (squaresState[i] === false) {
      unflippedSquares[i] = this.state.squares[i]; // "flips" current selected square

      squaresState[i] = true;

      let player = this.state.player === 1 ? 2 : 1;
      let turn = this.state.turn === "red" ? "green" : "red";

      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];

      this.setState((oldState) => ({
        sourceSelection: -1,
        unflippedSquares,
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

      return;
    }

    if (this.state.sourceSelection === -1) {
      if (
        !unflippedSquares[i] ||
        unflippedSquares[i].player !== this.state.player
      ) {
        this.setState({
          status:
            "Wrong selection. Choose player " + this.state.player + " pieces.",
        });
        if (unflippedSquares[i]) {
          unflippedSquares[i].style = {
            ...unflippedSquares[i].style,
            backgroundColor: "",
          }; // think this clears the selection glow
        }
      } else {
        unflippedSquares[i].style = {
          ...unflippedSquares[i].style,
          backgroundColor: "RGB(111,143,114)",
        }; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i,
        });
      }
      return;
    }

    unflippedSquares[this.state.sourceSelection].style = {
      ...unflippedSquares[this.state.sourceSelection].style,
      backgroundColor: "",
    };

    if (
      unflippedSquares[i] &&
      unflippedSquares[i].player === this.state.player
    ) {
      this.setState({
        status: "Wrong selection. Choose valid source and destination again. 1",
        sourceSelection: -1,
      });
    } else {
      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];
      const isDestEnemyOccupied = Boolean(unflippedSquares[i]);
      const isMovePossible = unflippedSquares[
        this.state.sourceSelection
      ].isMovePossible(
        this.state.sourceSelection,
        i,
        isDestEnemyOccupied,
        unflippedSquares
      );

      if (isMovePossible) {
        if (unflippedSquares[i] !== null) {
          if (unflippedSquares[i].type === "flag") {
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
                blackFallenSoldiers.push(unflippedSquares[i]);

                unflippedSquares[i] =
                  unflippedSquares[this.state.sourceSelection];
                unflippedSquares[this.state.sourceSelection] = null;

                this.updateThis(
                  unflippedSquares,
                  whiteFallenSoldiers,
                  blackFallenSoldiers
                );
                return;
              }
              this.setState({
                status:
                  "Can not capture the flag, must destory all mines first!",
              });
              return;
            }

            if (this.state.player === 2) {
              // check if all white mines are gone

              let fallenMine = 0;

              for (let i = 0; i < this.state.whiteFallenSoldiers.length; i++) {
                if (this.state.whiteFallenSoldiers[i].type === "mine") {
                  fallenMine += 1;
                }
              }

              if (fallenMine === 3) {
                // if all mines are gone, flag can be attacked
                whiteFallenSoldiers.push(unflippedSquares[i]);

                unflippedSquares[i] =
                  unflippedSquares[this.state.sourceSelection];
                unflippedSquares[this.state.sourceSelection] = null;

                this.updateThis(
                  unflippedSquares,
                  whiteFallenSoldiers,
                  blackFallenSoldiers
                );
                return;
              }

              this.setState({
                status:
                  "Can not capture the flag, must destory all mines first!",
              });
              return;
            }
          }

          // for when engineer attacks mine
          if (
            unflippedSquares[i].type === "mine" &&
            unflippedSquares[this.state.sourceSelection].type === "engineer"
          ) {
            //engineer live, mine die
            if (this.state.player === 1) {
              blackFallenSoldiers.push(unflippedSquares[i]);
            } else if (this.state.player === 2) {
              whiteFallenSoldiers.push(unflippedSquares[i]);
            }

            unflippedSquares[i] = unflippedSquares[this.state.sourceSelection];
            unflippedSquares[this.state.sourceSelection] = null;

            this.updateThis(
              unflippedSquares,
              whiteFallenSoldiers,
              blackFallenSoldiers
            );

            return;
          }

          // for when bomb attacks mine
          if (
            unflippedSquares[i].type === "mine" &&
            unflippedSquares[this.state.sourceSelection].type === "bomb"
          ) {
            //mine die, bomb die

            if (this.state.player === 1) {
              whiteFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
              blackFallenSoldiers.push(unflippedSquares[i]);
            } else if (this.state.player === 2) {
              whiteFallenSoldiers.push(unflippedSquares[i]);
              blackFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
            }

            unflippedSquares[i] = null;
            unflippedSquares[this.state.sourceSelection] = null;

            this.updateThis(
              unflippedSquares,
              whiteFallenSoldiers,
              blackFallenSoldiers
            );

            return;
          }

          if (unflippedSquares[i].type === "mine") {
            //wrong selection, cant attack mine
            this.setState({
              status: "Only engineer and bomb can attack mine!",
            });
            return;
          }

          // if either piece is a bomb, both are destoryed
          if (
            unflippedSquares[i].type === "bomb" ||
            unflippedSquares[this.state.sourceSelection].type === "bomb"
          ) {
            if (this.state.player === 1) {
              blackFallenSoldiers.push(unflippedSquares[i]);
              whiteFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
            } else if (this.state.player === 2) {
              blackFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
              whiteFallenSoldiers.push(unflippedSquares[i]);
            }

            unflippedSquares[i] = null;
            unflippedSquares[this.state.sourceSelection] = null;

            this.updateThis(
              unflippedSquares,
              whiteFallenSoldiers,
              blackFallenSoldiers
            );
            return;
          }

          // check piece value, if equal both destroyed
          if (
            unflippedSquares[i].value ===
            unflippedSquares[this.state.sourceSelection].value
          ) {
            if (this.state.player === 1) {
              blackFallenSoldiers.push(unflippedSquares[i]);
              whiteFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
            } else if (this.state.player === 2) {
              blackFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
              whiteFallenSoldiers.push(unflippedSquares[i]);
            }

            unflippedSquares[i] = null;
            unflippedSquares[this.state.sourceSelection] = null;

            this.updateThis(
              unflippedSquares,
              whiteFallenSoldiers,
              blackFallenSoldiers
            );
            return;
          }

          // initiates attack, wins
          if (
            unflippedSquares[i].value <
            unflippedSquares[this.state.sourceSelection].value
          ) {
            if (this.state.player === 1) {
              blackFallenSoldiers.push(unflippedSquares[i]);
            } else if (this.state.player === 2) {
              whiteFallenSoldiers.push(unflippedSquares[i]);
            }

            unflippedSquares[i] = unflippedSquares[this.state.sourceSelection];
            unflippedSquares[this.state.sourceSelection] = null;

            this.updateThis(
              unflippedSquares,
              whiteFallenSoldiers,
              blackFallenSoldiers
            );
            return;
          }

          // initiates attack, loses
          if (
            unflippedSquares[i].value >
            unflippedSquares[this.state.sourceSelection].value
          ) {
            if (this.state.player === 1) {
              whiteFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
            } else if (this.state.player === 2) {
              blackFallenSoldiers.push(
                unflippedSquares[this.state.sourceSelection]
              );
            }

            unflippedSquares[this.state.sourceSelection] = null;

            this.updateThis(
              unflippedSquares,
              whiteFallenSoldiers,
              blackFallenSoldiers
            );
            return;
          }
        } else {
          // here is when your just moving
          unflippedSquares[i] = unflippedSquares[this.state.sourceSelection];
          unflippedSquares[this.state.sourceSelection] = null;

          this.updateThis(
            unflippedSquares,
            whiteFallenSoldiers,
            blackFallenSoldiers
          );
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

  updateThis(unflippedSquares, whiteFallenSoldiers, blackFallenSoldiers) {
    let player = this.state.player === 1 ? 2 : 1;
    let turn = this.state.turn === "red" ? "green" : "red";

    this.setState((oldState) => ({
      sourceSelection: -1,
      unflippedSquares,
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
        <RulesModal
          show={this.state.modalShow}
          onHide={() => {
            this.setState((oldState) => ({
              modalShow: false,
            }));
          }}
          onNext={() => {
            if (this.state.pageNumber < 4) {
              this.setState((oldState) => ({
                pageNumber: oldState.pageNumber + 1,
              }));
            }
          }}
          onBack={() => {
            if (this.state.pageNumber > 1) {
              this.setState((oldState) => ({
                pageNumber: oldState.pageNumber - 1,
              }));
            }
          }}
          pageNumber={this.state.pageNumber}
        />

        <div className="game">
          <Board
            unflippedSquares={this.state.unflippedSquares}
            onClick={(i) => this.handleClick(i)}
          />

          <div className="game-info">
            <h3>Turn</h3>
            <div
              id="player-turn-box"
              style={{ backgroundColor: this.state.turn }}
            ></div>
            <div className="game-status">{this.state.status}</div>

            {/* <div className="fallen-soldier-block">
              {
                <FallenSoldierBlock
                  whiteFallenSoldiers={this.state.whiteFallenSoldiers}
                  blackFallenSoldiers={this.state.blackFallenSoldiers}
                />
              }
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
