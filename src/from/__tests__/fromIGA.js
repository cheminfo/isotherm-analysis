import { readFileSync } from 'fs';
import { join } from 'path';

import { fromIGA, testables } from '../fromIGA';

const {
  getLineNumbersOfMeasurement,
  parseIGAMeasurmentHeader,
  parseIGADataBlock,
  parseOneIGA,
} = testables;

test('fromIGA', () => {
  const file = readFileSync(
    join(__dirname, '../../../testFiles/IGA_raw.txt'),
    'latin1',
  );

  const lines = file.split(/[\r\n]+/);

  const linenumbers = getLineNumbersOfMeasurement(lines);
  expect(linenumbers).toStrictEqual([
    [1, 107, 213, 319],
    [106, 212, 318, 424],
  ]);

  const header = parseIGAMeasurmentHeader(lines.slice(3, 69));
  expect(header.scan).toStrictEqual(1);
  expect(header.sampleWeight).toStrictEqual(9.2627);
  expect(header.sampleWeightDry).toStrictEqual(8.9674);

  const dataBlock = parseIGADataBlock(lines.slice(73, 103));
  expect(dataBlock.pressure[0]).toBeCloseTo(-0.07, 5);
  expect(dataBlock.gasDensity[0]).toStrictEqual(0.0);

  const meas = parseOneIGA(lines.slice(1, 106));
  expect(meas.meta.sampleNumber).toStrictEqual('0328');
  expect(meas.data.wtPercent).toHaveLength(30);
  expect(meas.data.wtPercent[29]).toStrictEqual(1.447);

  let spectra = fromIGA(file);
  expect(spectra).toHaveLength(4);
});
