import { readFileSync } from 'fs';
import { join } from 'path';

import { readFile } from 'xlsx';

import { fromIGAExcel } from '../fromIGAExcel';

test('fromIGAExcel', () => {
  const workbook = readFileSync(
    join(__dirname, '../../../testFiles/IGAExcel.xlsx'),
  );
  const analysis = fromIGAExcel(workbook);
  expect(analysis.spectra).toHaveLength(2);
  expect(analysis.spectra[0].variables.x.data).toHaveLength(15);
  expect(analysis.spectra[1].variables.y.data).toHaveLength(12);
  expect(analysis.spectra[0].variables.x.data[0]).toBe(0);
  expect(analysis.spectra[0].variables.x.data[14]).toBe(1000.1);
  expect(analysis.spectra[0].variables.y.data[0]).toBe(-0.0001);
  expect(analysis.spectra[0].variables.y.data[14]).toBe(3.4866);
  expect(analysis.spectra[0].dataType).toBe('Adsorption Isotherm');
  expect(analysis.spectra[1].dataType).toBe('Desorption Isotherm');
  // A bit unintuitive that the x values are sorted ...
  expect(analysis.spectra[1].variables.x.data[0]).toBe(0);
  expect(analysis.spectra[1].variables.x.data[11]).toBe(1000.1);
  expect(analysis.spectra[1].variables.y.data[0]).toBe(0.032);
});
