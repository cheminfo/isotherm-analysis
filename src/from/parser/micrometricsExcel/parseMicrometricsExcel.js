import { getMatrixFromWorkbook } from './getMatrixFromWorkbook';
import { parseMeta } from './parseMeta';
import { parseTables } from './parseTables';

/**
 *
 * Parses an Excel workbook containing Micromeritics data
 * @param {object} workbook xlsx workbook to parse
 * @return {object} Object with meta data and tables data
 */
export function parseMicromeriticsExcel(workbook) {
  const matrix = getMatrixFromWorkbook(workbook);
  const meta = parseMeta(matrix);
  const tables = parseTables(matrix);
  return { meta: meta, tables: tables };
}
