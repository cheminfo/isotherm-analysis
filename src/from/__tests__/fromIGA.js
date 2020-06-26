import { readFileSync } from 'fs';
import { join } from 'path';

import { fromIGA, testables } from '../fromIGA';
import { exception } from 'console';

const {
  getLineNumbersOfMeasurement,
  parseIGAMeasurmentHeader,
  parseDataBlock,
} = testables;

test('fromPerkinElmer', () => {
  const file = readFileSync(
    join(__dirname, '../../../testFiles/IGA_raw.txt'),
    'latin1',
  );

  const lines = file.split(/[\r\n]+/);

  const linenumbers = getLineNumbersOfMeasurement(lines);
  expect(linenumbers).toStrictEqual([
    [1, 107, 213, 319],
    [104, 210, 316, 422],
  ]);

  const header = parseIGAMeasurmentHeader(lines.slice(3, 69));
  expect(header.Scan).toStrictEqual(1);
  expect(header.SampleWeight).toStrictEqual(9.2627);
  expect(header.SampleWeightDry).toStrictEqual(8.9674);

  const dataBlock = parseDataBlock(lines.slice(74, 103));
  console.log(dataBlock);
  // let analysis = fromIGA(file);

  // let spectrum1 = analysis.getSpectrum();

  // expect(spectrum1.variables.x.data).toHaveLength(1155);
  // expect(spectrum1.variables.y.data).toHaveLength(1155);
  // expect(spectrum1.variables.x.label).toStrictEqual('Temperature [°C]');
  // expect(spectrum1.variables.y.label).toStrictEqual('Weight [mg]');
  // expect(spectrum1.variables.x.units).toStrictEqual('°C');
  // expect(spectrum1.variables.y.units).toStrictEqual('mg');

  // let spectrum2 = analysis.getSpectrum({ flavor: 'mg vs s' });

  // expect(spectrum2.variables.x.data).toHaveLength(1155);
  // expect(spectrum2.variables.y.data).toHaveLength(1155);
  // expect(spectrum2.variables.x.label).toStrictEqual('Time [s]');
  // expect(spectrum2.variables.y.label).toStrictEqual('Weight [mg]');
  // expect(spectrum2.variables.x.units).toStrictEqual('s');
  // expect(spectrum2.variables.y.units).toStrictEqual('mg');
});
