import { readFileSync } from 'fs';
import { join } from 'path';

import { testables, fromMicrometricsTXT } from '../fromMicrometricsTXT';

const { findDataBlocks, parseIsothermTable, parseMetaBlock } = testables;
const file = readFileSync(
  join(__dirname, '../../../testFiles/GVM-BET-Gemini.VII.2390.v1.03.TXT'),
  'utf16le',
);

const lines = file.split(/\r?\n/).filter((line) => !line.match(/^\s*$/));

test('finding the datablocks', () => {
  let startsAndEnds = findDataBlocks(lines);
  expect(startsAndEnds).toHaveLength(2);
  expect(startsAndEnds[0]).toStrictEqual([35]);
  expect(startsAndEnds[1]).toStrictEqual([70]);
});

test('parsing the datablocks', () => {
  let data = parseIsothermTable(lines.slice(35, 70));
  expect(data.pSat).toStrictEqual(770.761292 * 0.13332);
  expect(Object.keys(data)).toStrictEqual(['x', 'y', 'p', 'pSat']);
  expect(data.x).toHaveLength(29);
  expect(data.y).toHaveLength(29);
  expect(data.p).toHaveLength(29);
  expect(data.x[0]).toBe(0.004850987);
  expect(data.x[1]).toBe(0.049878494);

  expect(data.y[0]).toBe(1.03939);
  expect(data.y[1]).toBe(1.61717);
  expect(data.p[0]).toStrictEqual(3.738953 * 0.13332);

  expect(data.x[28]).toBe(0.949882695);
  expect(data.y[28]).toBe(10.3795);
});

test('parsing the metablock', () => {
  let meta = parseMetaBlock(lines, 35);
  expect(meta.sample).toBe('gvmh97400');
  expect(meta.operator).toBe('manohara');
  expect(meta.submitter).toBe('degas 100');
  expect(meta.file).toBe(
    'C:\\Gemini VII\\data\\USERS\\Manohara\\gvmh97.SMP',
  );
  expect(meta.started).toBe('20/07/2020 15:17:42');
  expect(meta.adsorptive).toBe('N2');
  expect(meta.completed).toBe('20/07/2020 21:54:54');
  expect(meta.equilibrationTime).toBe(10);
  expect(meta.equilibrationTimeUnit).toBe('s');
  expect(meta.reportTime).toBe('21/07/2020 12:10:01');

  expect(meta.sampleWeight).toBe(0.121);
  expect(meta.sampleWeightUnit).toBe('g');

  expect(meta.model).toBe('2390 a');
  expect(meta.sampleDensity).toBe(1.0);
  expect(meta.sampleDensityUnit).toBe('g/cm³');
  expect(meta.evacRate).toBe(20);
  expect(meta.evacRateUnit).toBe('mmHg/min');
});
test('create an analysis object', () => {
  let analysis = fromMicrometricsTXT(file);
  expect(Object.keys(analysis.spectra[0].variables)).toStrictEqual([
    'x',
    'y',
    'p',
  ]);
  expect(analysis.spectra[0].dataType).toBe('Adsorption Isotherm');
});
