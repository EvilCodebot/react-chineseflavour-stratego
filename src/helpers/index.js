const diagonalDictionaryTLBR = require("../dictionaries/diagonalTopLeftBottomRight-army.json");
const diagonalDictionaryTRBL = require("../dictionaries/diagonalTopRightBottomLeft-army.json");
const rowDictionary = require("../dictionaries/row-army.json");
const columnDictionary = require("../dictionaries/column-army.json");

const isSameRow = (src, dest) => {
  return !!(rowDictionary[src] && rowDictionary[src][dest]);
};

const isSameColumn = (src, dest) => {
  return !!(columnDictionary[src] && columnDictionary[src][dest]);
};

const isSameDiagonal = (src, dest) => {
  return !!(
    (diagonalDictionaryTLBR[src] && diagonalDictionaryTLBR[src][dest]) ||
    (diagonalDictionaryTRBL[src] && diagonalDictionaryTRBL[src][dest])
  );
};

const isPathClean = (srcToDestPath, squares) => {
  let isLegal = true;
  for (let i = 0; i < srcToDestPath.length; i++) {
    if (squares[srcToDestPath[i]] !== null) {
      isLegal = false;
    }
  }
  return isLegal;
};

const isNotInSafeHouse = (squares, dest) => {
  let isLegal = true;

  if (squares[dest] == null) {
    isLegal = true;
  } else {
    if (dest === 11) {
      isLegal = false;
    }
    if (dest === 13) {
      isLegal = false;
    }
    if (dest === 17) {
      isLegal = false;
    }
    if (dest === 21) {
      isLegal = false;
    }
    if (dest === 23) {
      isLegal = false;
    }
    if (dest === 36) {
      isLegal = false;
    }
    if (dest === 38) {
      isLegal = false;
    }
    if (dest === 42) {
      isLegal = false;
    }
    if (dest === 46) {
      isLegal = false;
    }
    if (dest === 48) {
      isLegal = false;
    }
  }

  return isLegal;
};

module.exports = {
  isSameRow,
  isSameColumn,
  isSameDiagonal,
  isPathClean,
  isNotInSafeHouse,
};
