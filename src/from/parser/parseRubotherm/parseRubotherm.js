import { getMatrixFromWorkbook } from './getMatrixFromWorkbook';
import { parseHeader } from './parseHeader';
import { parseTable } from './parseTable';

/**
 * Parses the whole excel file
 * @param {object} workbook XLSX Excel workbook to parse
 * @returns {object} Object with meta object and variables array
 */

export function parseRubotherm(workbook) {
  let matrix = getMatrixFromWorkbook(workbook);
  let header = parseHeader(matrix);
  let table = parseTable(matrix, header.i);
  return { meta: header.meta, variables: table.variables };
}
