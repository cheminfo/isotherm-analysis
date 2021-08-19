import { join } from 'path';

import { getMatrixFromWorkbook } from '../getMatrixFromWorkbook';
import { parseMeta } from '../parseMeta';

let xlsx = require('xlsx');

const workbook = xlsx.readFile(
  join(
    __dirname,
    '../../testFiles/Isotherm_Micromeritics_AlPyr-CO2-278K 2.XLS',
  ),
);
const matrix = getMatrixFromWorkbook(workbook);
const parsed = parseMeta(matrix);

test('parseMeta', () => {
  expect(parsed.title).toStrictEqual(
    '3Flex 4.02 3Flex Version 4.02 Page 1 Serial # 811  Unit 1  Port 3',
  );
  expect(parsed.File).toStrictEqual(
    'C:\\3Flex\\data\\Jordi\\Nency\\AlPyr-CO2-278K.SMP',
  );
  expect(parsed['Analysis adsorptive']).toStrictEqual('CO2');
  expect(parsed['Summary Report']).toBeUndefined();
  expect(parsed['Qm·C']).toStrictEqual('0.00042 ± 0.0002 mmol/g');
  expect(parsed['Sample density']).toStrictEqual('1.000 g/cm³');
  expect(
    parsed[
      'Cumulative pore volume of pores between 2.8163 Å and 2.8163 Å hydraulic radius'
    ],
  ).toStrictEqual('0.000000 cm³/g');
});
