/**
 * Parses the header/meta of an excel workbook
 * @param {array} baseMatrix Matrix derived from the excel workbook
 * @return {object} Object containing the meta data of the workbook
 */
export function parseMeta(baseMatrix) {
  if (baseMatrix === []) {
    return {};
  }
  const matrix = [...baseMatrix];
  const meta = {};
  let horizontalLimit = 0;
  for (
    ;
    horizontalLimit < matrix[0].length && matrix[0][horizontalLimit] !== '|';
    horizontalLimit++
  );

  let title = '';
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < horizontalLimit; j++) {
      const current = matrix[i][j];
      if (current) {
        title = `${title}${current} `;
      }
    }
  }
  meta.title = title.replace(/ $/, '');

  for (let i = 3; i < matrix.length; i++) {
    for (let j = 0; j < horizontalLimit; j++) {
      const current = matrix[i][j];
      if (current && !current.match(/^ *$/)) {
        if (j + 1 < horizontalLimit && current.match(/:$/)) {
          meta[current.replace(':', '')] = matrix[i][j + 1];
        } else if (
          i + 1 < matrix.length &&
          matrix[i + 1][j] &&
          matrix[i + 1][j].match(/:$/)
        ) {
          matrix[i + 1][j] = `${current}${matrix[i + 1][j]}`;
        }
      }
    }
  }
  return meta;
}
