import { readFileSync } from 'fs';
import { join } from 'path';

import { fromBelsorpCSV } from '../fromBelsorpCSV';

describe('fromBelsorpCSV', () => {
  it.only('belsorp.csv', () => {
    const binary = readFileSync(join(__dirname, 'data/belsorp.csv'));
    const analysis = fromBelsorpCSV(binary);
    delete analysis.spectra[0].id;
    delete analysis.spectra[1].id;
    expect(analysis.spectra).toMatchSnapshot();
  });
  it('belsorp2.csv', () => {
    const binary = readFileSync(join(__dirname, 'data/belsorp2.csv'));
    const analysis = fromBelsorpCSV(binary);
    delete analysis.spectra[0].id;
    expect(analysis.spectra).toMatchSnapshot();
  });
  it('belsorp3.csv', () => {
    const binary = readFileSync(join(__dirname, 'data/belsorp3.csv'));
    const analysis = fromBelsorpCSV(binary);
    delete analysis.spectra[0].id;
    expect(analysis.spectra).toMatchSnapshot();
  });
});
