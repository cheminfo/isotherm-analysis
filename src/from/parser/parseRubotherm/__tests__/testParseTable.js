import { join } from 'path';

import { getMatrixFromWorkbook } from '../getMatrixFromWorkbook';
import { parseTable } from '../parseTable';

let xlsx = require('xlsx');

const workbook = xlsx.readFile(
  join(
    __dirname,
    '../../testFiles/8_Rubotherm_gravimetric_(Single_gas_high_pressure).xls',
  ),
);

const matrix = getMatrixFromWorkbook(workbook);

test('parseTable', () => {
  expect(parseTable(matrix, { i: 0 })[0].label).toStrictEqual('Temperature');
  expect(parseTable(matrix, { i: 0 })[0].data[9]).toStrictEqual(35);
  expect(parseTable(matrix, { i: 11 })).toStrictEqual([]);
  expect(parseTable(matrix, { i: 9 })[3].data[9]).toStrictEqual(11.84);
  expect(parseTable(matrix, { i: 9 })[5].data[9]).toStrictEqual(11.9);
  expect(parseTable(matrix, { i: 9 })[7].data[9]).toStrictEqual(26.749192);
});
