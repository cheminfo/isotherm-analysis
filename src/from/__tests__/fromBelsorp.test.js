import { readFileSync } from 'fs';
import { join } from 'path';

import { readFile } from 'xlsx';

import { fromBelsorp, testables } from '../fromBelsorp';

const { parseIsothermBlock, getAdsDesMeta, parseAdsDesData } = testables;

test('fromBelsorp', () => {
  const workbook = readFile(join(__dirname, '../../../testFiles/BET.xls'));

  const adsDesSheet = workbook.Sheets.AdsDes;

  // Parsing metadata
  const meta = getAdsDesMeta(adsDesSheet);

  expect(meta.sampleWeight).toBe(0.033);
  expect(meta.sampleWeightUnit).toBe('g');

  expect(meta.adsorptionT).toBe(77);
  expect(meta.saturatedVaporPressure).toBe(83.744);
  expect(meta.saturatedVaporPressureUnit).toBe('kPa');

  // Parse an isotherm block
  const rangeAds = {
    s: { c: 1, r: 22 },
    e: { c: 6, r: 22 + 21 - 1 },
  };
  const isothermBlock = parseIsothermBlock(adsDesSheet, rangeAds);
  expect(isothermBlock.pi).toHaveLength(21);
  expect(isothermBlock.pe).toHaveLength(21);
  expect(isothermBlock.pe2).toHaveLength(21);
  expect(isothermBlock.p0).toHaveLength(21);
  expect(isothermBlock.pp0).toHaveLength(21);
  expect(isothermBlock.va).toHaveLength(21);

  // Parsing the datablock
  const data = parseAdsDesData(adsDesSheet, 21, 11);
  expect(data.adsorption.p0).toHaveLength(21);
  expect(data.desorption.p0).toHaveLength(11);

  expect(data.adsorption.p0[0]).toBe(83.744);
  expect(data.adsorption.va[20]).toBeCloseTo(9822.4457, 3);

  expect(data.desorption.p0[0]).toBe(83.744);
  expect(data.desorption.va[10]).toBeCloseTo(8838.2381176, 3);

  const dataFile = readFileSync(join(__dirname, '../../../testFiles/BET.xls'));
  const analysis = fromBelsorp(dataFile);

  expect(analysis.spectra).toHaveLength(2);

  expect(Object.keys(analysis.spectra[0].variables)).toStrictEqual([
    'x',
    'y',
    'p',
  ]);
  expect(Object.keys(analysis.spectra[1].variables)).toStrictEqual([
    'x',
    'y',
    'p',
  ]);

  expect(analysis.spectra[0].dataType).toBe('Adsorption Isotherm');
  expect(analysis.spectra[1].dataType).toBe('Desorption Isotherm');
});

test('fromBelsorp 2', () => {
  const workbook = readFile(join(__dirname, '../../../testFiles/belsorp2.xls'));

  const adsDesSheet = workbook.Sheets.AdsDes;

  // Parsing metadata
  const meta = getAdsDesMeta(adsDesSheet);

  expect(meta.sampleWeight).toBe(0.046);
  expect(meta.sampleWeightUnit).toBe('g');

  expect(meta.adsorptionT).toBe(77);
  expect(meta.saturatedVaporPressure).toBe(95.748);
  expect(meta.saturatedVaporPressureUnit).toBe('kPa');

  // Parse an isotherm block
  const rangeAds = {
    s: { c: 1, r: 22 },
    e: { c: 6, r: 22 + 21 - 1 },
  };
  const isothermBlock = parseIsothermBlock(adsDesSheet, rangeAds);
  expect(isothermBlock.pi).toHaveLength(21);
  expect(isothermBlock.pe).toHaveLength(21);
  expect(isothermBlock.pe2).toHaveLength(21);
  expect(isothermBlock.p0).toHaveLength(21);
  expect(isothermBlock.pp0).toHaveLength(21);
  expect(isothermBlock.va).toHaveLength(21);

  // Parsing the datablock
  const data = parseAdsDesData(adsDesSheet, 28, 17);
  expect(data.adsorption.p0).toHaveLength(28);
  expect(data.desorption.p0).toHaveLength(17);

  expect(data.adsorption.p0[0]).toBe(95.748);
  expect(data.adsorption.va[20]).toBeCloseTo(14667.63838, 3);

  expect(data.desorption.p0[0]).toBe(95.748);
  expect(data.desorption.va[10]).toBeCloseTo(14560.11615, 3);

  const dataFile = readFileSync(
    join(__dirname, '../../../testFiles/belsorp2.xls'),
  );
  const analysis = fromBelsorp(dataFile);

  expect(analysis.spectra).toHaveLength(2);

  expect(Object.keys(analysis.spectra[0].variables)).toStrictEqual([
    'x',
    'y',
    'p',
  ]);
  expect(Object.keys(analysis.spectra[1].variables)).toStrictEqual([
    'x',
    'y',
    'p',
  ]);

  expect(analysis.spectra[0].dataType).toBe('Adsorption Isotherm');
  expect(analysis.spectra[1].dataType).toBe('Desorption Isotherm');
});
