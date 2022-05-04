import { utils } from 'xlsx';

/**
 * Converts an excel file to a matrix
 * @param {object} workbook XLSX Excel workbook
 * @returns {array} Matrix of cells
 */

export function getMatrixFromWorkbook(workbook) {
  let csv = utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
  let lines = csv.split(/\r?\n/);
  let matrix = [];
  for (let i = 0; i < lines.length; i++) {
    matrix[i] = lines[i].split(',');
  }
  return matrix;
}
