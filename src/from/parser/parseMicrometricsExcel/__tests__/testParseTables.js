import { join } from 'path';

import { readFile } from 'xlsx';

import { getMatrixFromWorkbook } from '../getMatrixFromWorkbook';
import { parseTables } from '../parseTables';

const workbook = readFile(
  join(
    __dirname,
    '../../../../../testFiles/Isotherm_Micromeritics_AlPyr-CO2-278K 2.XLS',
  ),
);
const matrix = getMatrixFromWorkbook(workbook);
const parsed = parseTables(matrix);

test('parseTables', () => {
  expect(parsed['Isotherm Linear Absolute Plot'].y).toBeUndefined();
  expect(
    parsed['Isotherm Tabular Report'].data['Elapsed Time (h:min)'][9],
  ).toBe('03:28');
  expect(
    parsed['Isotherm Pressure Composition'][
      'AlPyr-CO2-278K : AlPyr-CO2-278K : Desorption'
    ]['Weight % CO2'][9],
  ).toBe(2.269092491);
  expect(
    parsed['Isotherm Linear Absolute Plot'][
      'AlPyr-CO2-278K : AlPyr-CO2-278K : Adsorption'
    ]['Quantity Adsorbed (mmol/g)'][0],
  ).toBe(0.04578717);
});
