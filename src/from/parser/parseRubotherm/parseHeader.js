/**
 * Parses a cells matrix and returns the meta and the variables
 * @param {array} matrix Cells matrix extracted from the file
 * @returns {Object} Object containing the meta and ending row
 */

export function parseHeader(matrix) {
  let meta = {};
  let i = 0;
  let dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  for (i = 0; i < matrix.length && matrix[i][0] !== 'Temperature'; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      let current = matrix[i][j];
      if (current && isNaN(current)) {
        if (dateRegex.test(current)) {
          meta.Date = current;
        } else if (j + 1 < matrix[i].length) {
          if (matrix[i][j + 1] && !isNaN(matrix[i][j + 1])) {
            meta[current] = parseFloat(matrix[i][j + 1], 10);
            continue;
          } else if (
            j + 2 < matrix[i].length &&
            (!matrix[i][j + 1] || isNaN(matrix[i][j + 1])) &&
            matrix[i][j + 2] &&
            !isNaN(matrix[i][j + 2])
          ) {
            if (matrix[i][j + 1]) {
              meta[`${current} ${matrix[i][j + 1]}`] = parseFloat(
                matrix[i][j + 2],
                10,
              );
            } else {
              meta[current] = parseFloat(matrix[i][j + 2], 10);
            }
            j++;
            continue;
          }
        }
        if (i + 1 < matrix.length && !isNaN(matrix[i + 1][j])) {
          if (
            j + 1 < matrix[i + 1].length &&
            matrix[i + 1][j + 1] &&
            !isNaN(matrix[i + 1][j + 1])
          ) {
            meta[`${current} corrected`] = parseFloat(matrix[i + 1][j], 10);
            meta[`${current} uncorrected`] = parseFloat(
              matrix[i + 1][j + 1],
              10,
            );
          } else {
            meta[current] = parseFloat(matrix[i + 1][j], 10);
          }
        }
      }
    }
  }
  return {
    meta: meta,
    i: i,
  };
}
