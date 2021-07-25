import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function checkRulePageNumber(page) {
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

export default function RulesModal(props) {
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
      <Modal.Body>{checkRulePageNumber(props.pageNumber)}</Modal.Body>
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
