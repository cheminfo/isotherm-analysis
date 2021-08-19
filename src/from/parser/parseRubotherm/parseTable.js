import { labelUnit } from './labelUnit';

/**
 * Parses a table
 * @param {array} matrix Cells data extracted from the file
 * @param {object} [options={}]
 * @param {number} [options.i] Starting row of the function
 * @returns {array} Array of objects corresponding to each column
 */

export function parseTable(matrix, options = {}) {
  let { i: startingRow = 0 } = options;
  for (
    startingRow;
    startingRow < matrix.length && matrix[startingRow][0] !== 'Temperature';
    startingRow++
  );
  if (startingRow === matrix.length) {
    return [];
  }
  const subMatrix = matrix.slice(startingRow);
  const variables = [];
  for (let j = 0; j < subMatrix[0].length; j++) {
    const values = [];
    for (let i = 1; i < subMatrix.length; i++) {
      const value = parseFloat(subMatrix[i][j]);
      if (!isNaN(value)) {
        values.push(value);
      }
    }
    let split = labelUnit(subMatrix[0][j]);
    let variable = { label: split.label, units: split.unit, data: values };
    variables.push(variable);
  }
  return variables;
}
