import { join } from 'path';

import { readFile } from 'xlsx';

import { getMatrixFromWorkbook } from '../getMatrixFromWorkbook';
import { parseHeader } from '../parseHeader';

const workbook = readFile(
  join(
    __dirname,
    '../../../../..//testFiles/8_Rubotherm_gravimetric_(Single_gas_high_pressure).xls',
  ),
);
const matrix = getMatrixFromWorkbook(workbook);
const parsed = parseHeader(matrix).meta;

test('parseHeader', () => {
  expect(parsed['ZP Tem:']).toBe(0);
  expect(parsed['zero point']).toStrictEqual(-0.000035);
  expect(parsed['masse of system with Virgin adsorbent 9 corrected']).toBe(
    6.745413,
  );
  expect(parsed['Volume adsorbed phase cc/g']).toBe(0.065509);
  expect(parsed['masse of all system (sinker) uncorrected']).toBe(26.793937);
  expect(parsed.Date).toBe('30/08/2011');
  expect(parsed['Avogadro number']).toBe(6.02e23);
});
