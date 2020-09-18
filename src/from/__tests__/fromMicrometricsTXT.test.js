import { readFileSync } from 'fs';
import { join } from 'path';

import { testables, fromMicrometricsTXT } from '../fromMicrometricsTXT';

const { findDataBlocks, parseIsothermTable } = testables;
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
  expect(data.x[0]).toStrictEqual(0.004850987);
  expect(data.x[1]).toStrictEqual(0.049878494);

  expect(data.y[0]).toStrictEqual(1.03939);
  expect(data.y[1]).toStrictEqual(1.61717);
  expect(data.p[0]).toStrictEqual(3.738953 * 0.13332);

  expect(data.x[28]).toStrictEqual(0.949882695);
  expect(data.y[28]).toStrictEqual(10.3795);
});

test('create an analysis object', () => {
  let analysis = fromMicrometricsTXT(file);
  expect(analysis.spectra).toHaveLength(1);
});
