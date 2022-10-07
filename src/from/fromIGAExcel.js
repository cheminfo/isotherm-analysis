import { Analysis } from 'common-spectrum';
import { read, utils } from 'xlsx';

/**
 * Orchestrates the parsing of a Belsorp Excel (xls) file.
 *
 * @export
 * @param {Buffer} dataFile input excel file, e.g., read with readfilesync
 * @returns {Analysis}
 */
export function fromIGAExcel(dataFile) {
  const workbook = read(dataFile);
  const adsDesSheet = workbook.Sheets[workbook.SheetNames[0]];
  ///console.log(adsDesSheet[utils.encode_cell({ r: 0, c: 1 })]);
  parseIGAMeasurmentHeader({ start: 0, end: 18 }, adsDesSheet);
  return new Analysis();
}

/**
 * Parses and standardizes the metadata
 *
 * @param {string[]} lines
 * @returns {object}
 */
function parseIGAMeasurmentHeader(rowRange, sheet) {
  let metaData = {};
  // loop over the rows in the sheet and extract the values
  for (let i = rowRange.start; i < rowRange.end; i++) {
    let row = sheet[`A${i}`];
    let value = sheet[`B${i}`];
    if (row && value) {
      console.log(row.v.trim());
    }
  }
  //console.log(metaData);
}
