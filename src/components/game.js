import React from "react";
import "../index.css";
import Board from "./board.js";
import FallenSoldierBlock from "./fallen-soldier-block.js";
import initialiseChessBoard from "../helpers/board-initialiser.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

let openedSquares = Array(60).fill(false);

function displayRulePage(page) {
  if (page === 1) {
    return (
      <span>
        At the beginning of the game, all units are randomly placed on the board
        faced down. Players take turn to either flip unit thus revealing them or
        move their units. There are two ways to win, either by killing all enemy
        units or by capturing the enemy's flag.
      </span>
    );
  }
  if (page === 2) {
    return (
      <span>
        {" "}
        Each player have 25 units in total:
        <ul style={{ marginTop: "16px" }}>
          <li>Marshal 9, General 8, Flag - one per person</li>
          <li>
            Colonel 7, Major 6, Captain 5, Lieutenant 4, bomb - two per person
          </li>
          <li>Sergeant 3, Cadet 2, Engineer 1, mine - three per person</li>
        </ul>{" "}
        Each unit have different power levels. These are indicated by numbers.
      </span>
    );
  }
  if (page === 3) {
    return (
      <span>
        {" "}
        A unit with a larger value destroys a unit with a smaller value, if two
        units have equal value then they are both destroyed. Special units are
        flag, bomb, engineer and mine:
        <ul style={{ marginTop: "16px" }}>
          <li>If a bomb attacks or is attacked, both units are destroyed</li>
          <li>
            Only engineers can destroy mines (bomb can "bomb" mine too, in that
            case both bomb and mine are destroyed)
          </li>
          <li>
            The flag can be captured only after all three mines have been
            destroyed (any unit can then capture the flag)
          </li>
        </ul>{" "}
      </span>
    );
  }
  if (page === 4) {
    return (
      <span>
        {" "}
        Movement:
        <ul style={{ marginTop: "16px" }}>
          <li>Units can only move one position per turn on normal road</li>
          <li>
            Units can move to any straight line position if unit itself is on
            the railroad and the destination is also on the railroad and not
            obstructed.
          </li>
          <li>Flag and mines can not move</li>
          <li>
            Circles are safe houses, units in safe houses cannot be attacked
          </li>
        </ul>{" "}
        <b>That's all, happy strategizing!!! </b>
      </span>
    );
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Rules</Modal.Title>
      </Modal.Header>
      <Modal.Body>{displayRulePage(props.pageNumber)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onBack}>
          Back
        </Button>
        <Button variant="secondary" onClick={props.onNext}>
          Next
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(60).fill(null),
      ogSquares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: "",
      turn: "red",

      modalShow: true,
      pageNumber: 1,
    };
  }

  handleClick(i) {
    const squares = [...this.state.squares];

    //11, 13, 17，21 ,23, 36，38，42，46，48 these are safehouse
    openedSquares[11] = true;
    openedSquares[13] = true;
    openedSquares[17] = true;
    openedSquares[21] = true;
    openedSquares[23] = true;
    openedSquares[36] = true;
    openedSquares[38] = true;
    openedSquares[42] = true;
    openedSquares[46] = true;
    openedSquares[48] = true;

    if (openedSquares[i] === false) {
      squares[i] = this.state.ogSquares[i];

      openedSquares[i] = true;

      let player = this.state.player === 1 ? 2 : 1;
      let turn = this.state.turn === "red" ? "green" : "red";
      const whiteFallenSoldiers = [];
      const blackFallenSoldiers = [];

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

      return; // turn over baby
    }

    if (this.state.sourceSelection === -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({
          status:
            "Wrong selection. Choose player " + this.state.player + " pieces.",
        });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" }; // think this clears the selection glow
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

          // bomb checking, both destoryed
          if (
            squares[i].type === "bomb" ||
            squares[this.state.sourceSelection].type === "bomb"
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
    let turn = this.state.turn === "red" ? "green" : "red";

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
        <MyVerticallyCenteredModal
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
