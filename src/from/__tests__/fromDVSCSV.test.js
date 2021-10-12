import { readFileSync } from 'fs';
import { join } from 'path';

import { testables } from '../fromDVSCSV';

const file = readFileSync(
  join(__dirname, '../../../testFiles/CO2H2O_25C_30RH.csv'),
  'latin1',
);

const lines = file.split(/\r?\n/);

const { parseMeta, parseData } = testables;
test('parse meta data', () => {
  let meta = parseMeta(lines);
  expect(meta.methodName).toBe('Co-adsorption25C30RH_MARK2');
  expect(meta.methodCreated).toBe('2020-08-27 09:55:20 UTC +01:00');
  expect(meta.sampleName).toBe('Lewatitvpoc1065');
  expect(meta.sampleDescription).toBe('');
  expect(meta.adsorptive).toBe('Water');
  expect(meta.user).toBe('User');
  expect(meta.sampleWeight).toBe(27.4405);
  expect(meta.sampleWeightUnit).toBe('mg');
  expect(meta.vapourPressure).toBe(760);
  expect(meta.vapourPressureUnit).toBe('Torr');
  expect(meta.referenceMass).toBe(24.5817);
  expect(meta.auxiliaryProbeUsed).toBe('NO');
  expect(meta.chillerUsed).toBe('NO');
  expect(meta.slavePreheaterUsed).toBe('NO');
  expect(meta.chillerUsed).toBe('NO');
  expect(meta.counterWeight).toBe(0);
  expect(meta.counterWeightUnit).toBe('mg');
  expect(meta.dataPoints).toBe(48108);
  expect(meta.dataStartRow).toBe(43);
  expect(meta.firstDryRow).toBe(43);
  expect(meta.firstPostDryRow).toBe(11898);
  expect(meta.dataSavingInterval).toBe(5);
  expect(meta.dataSavingIntervalUnit).toBe('s');
  expect(meta.fileVersion).toBe('1.2');
});

test('parse data', () => {
  let parseResult = parseData(lines, 43);
  expect(parseResult).toBeInstanceOf(Object);
});
