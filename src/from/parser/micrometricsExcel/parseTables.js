/**
 * Parses multiple tables in the file
 * @param {array} matrix Matrix containing the tables
 * @return {object} Object containing multiple objects each corresponding to a table
 */
export function parseTables(matrix) {
  let startingRow = 0;
  for (let j = 0; j < matrix[startingRow].length; j++) {
    for (; startingRow < matrix.length; startingRow++) {
      if (matrix[startingRow][j] === 'Summary Report') {
        j = matrix[startingRow].length;
        break;
      }
    }
  }
  let startingCol = 0;
  for (
    ;
    startingCol < matrix[startingRow].length &&
    matrix[startingRow][startingCol] !== '|';
    startingCol++
  );
  const table = {};
  let title = '';
  let subtitle = 'data';
  let data = [];
  for (let j = startingCol; j < matrix[startingRow].length; j++) {
    if (matrix[startingRow][j] && matrix[startingRow][j] !== '|') {
      title = matrix[startingRow][j];
      table[title] = {};
    }
    for (let i = startingRow + 1; i < matrix.length; i++) {
      if (matrix[i][j] && matrix[i][j] !== '|') {
        if (isNaN(matrix[i][j]) && !matrix[i][j].match(/[0-9]+:[0-9]+$/)) {
          if (!matrix[i][j].match(/\)$|%/)) {
            if (i + 1 < matrix.length && matrix[i + 1][j].match(/\)$|%/)) {
              subtitle = matrix[i][j];
            }
          } else {
            if (!table[title][subtitle]) {
              table[title][subtitle] = {};
            }
            table[title][subtitle][matrix[i][j]] = [];
            data = table[title][subtitle][matrix[i][j]];
          }
        } else {
          if (matrix[i][j].match(/[0-9]+:[0-9]+$/)) {
            data.push(matrix[i][j]);
          } else {
            data.push(parseFloat(matrix[i][j]));
          }
        }
      }
    }
  }
  return table;
}
