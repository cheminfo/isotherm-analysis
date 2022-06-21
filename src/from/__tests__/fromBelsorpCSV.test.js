import { readFileSync } from 'fs';
import { join } from 'path';

import { fromBelsorpCSV } from '../fromBelsorpCSV';

describe('fromBelsorpCSV', () => {
  it('belsorp.csv', () => {
    const binary = readFileSync(join(__dirname, 'data/belsorp.csv'));
    const analysis = fromBelsorpCSV(binary);
    expect(analysis.spectra).toMatchSnapshot();
  });
  it('belsorp2.csv', () => {
    const binary = readFileSync(join(__dirname, 'data/belsorp2.csv'));
    const analysis = fromBelsorpCSV(binary);
    expect(analysis.spectra).toMatchSnapshot();
  });
  it('belsorp3.csv', () => {
    const binary = readFileSync(join(__dirname, 'data/belsorp3.csv'));
    const analysis = fromBelsorpCSV(binary);
    expect(analysis.spectra).toMatchSnapshot();
  });
});
