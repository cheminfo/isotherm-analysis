import { readFileSync } from 'fs';
import { join } from 'path';

import { testables } from '../fromDVSCSV';

const file = readFileSync(
  join(__dirname, '../../../testFiles/CO2H2O_25C_30RH.csv'),
  'latin1',
);

const lines = file.split(/\r?\n/);

const { parseMeta } = testables;
test('parse meta data', () => {
  let meta = parseMeta(lines);
  expect(meta.methodName).toStrictEqual('Co-adsorption25C30RH_MARK2');
  expect(meta.methodCreated).toStrictEqual('2020-08-27 09:55:20 UTC +01:00');
  expect(meta.sampleName).toStrictEqual('Lewatitvpoc1065');
  expect(meta.sampleDescription).toStrictEqual('');
  expect(meta.adsorptive).toStrictEqual('Water');
  expect(meta.user).toStrictEqual('User');
  expect(meta.sampleWeight).toStrictEqual(27.4405);
  expect(meta.sampleWeightUnit).toStrictEqual('mg');
  expect(meta.vapourPressure).toStrictEqual(760);
  expect(meta.vapourPressureUnit).toStrictEqual('Torr');
  expect(meta.referenceMass).toStrictEqual(24.5817);
  expect(meta.auxiliaryProbeUsed).toBe('NO');
  expect(meta.chillerUsed).toBe('NO');
  expect(meta.slavePreheaterUsed).toBe('NO');
  expect(meta.chillerUsed).toBe('NO');
  expect(meta.counterWeight).toStrictEqual(0);
  expect(meta.counterWeightUnit).toBe('mg');
  expect(meta.dataPoints).toStrictEqual(48108);
  expect(meta.dataStartRow).toStrictEqual(43);
  expect(meta.firstDryRow).toStrictEqual(43);
  expect(meta.firstPostDryRow).toStrictEqual(11898);
  expect(meta.dataSavingInterval).toStrictEqual(5);
  expect(meta.dataSavingIntervalUnit).toStrictEqual('s');
  expect(meta.fileVersion).toStrictEqual('1.2');
});
