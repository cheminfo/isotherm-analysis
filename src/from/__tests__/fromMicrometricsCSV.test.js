import { readFileSync } from 'fs';
import { join } from 'path';

import { fromMicrometricsCSV } from '../fromMicrometricsCSV';

test('fromMicrometrics', () => {
  const file = readFileSync(
    join(__dirname, '../../../testFiles/micrometrics.csv'),
    'latin1',
  );

  const analyses = fromMicrometricsCSV(file);
  expect(analyses.spectra).toHaveLength(2);
  const adsorption = analyses.spectra[0];

  expect(adsorption.variables.x.data).toHaveLength(68);
  expect(adsorption.variables.x.data[0]).toBe(4.29539e-5);
  expect(adsorption.variables.y.data).toHaveLength(68);
  expect(adsorption.variables.y.data[0]).toBeCloseTo(221.8668, 3);

  const desorption = analyses.spectra[1];
  expect(desorption.variables.x.data).toHaveLength(8);
  expect(desorption.variables.x.data[0]).toBe(0.222905289); // common-spectrum sorts the data
  expect(desorption.variables.y.data).toHaveLength(8);
  expect(desorption.variables.y.data[0]).toBeCloseTo(
    (285.0784237 / 22.413969545014) * 1000,
    2,
  );
});
