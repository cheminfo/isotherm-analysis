import { Analysis } from 'common-spectrum';

import { parseBelsorpCSV } from './parseBelsorpCSV';

export function fromBelsorpCSV(binary) {
  const result = parseBelsorpCSV(binary);
  const analysis = new Analysis();

  analysis.pushSpectrum(
    {
      x: result.adsorption['p/p0'],
      y: result.adsorption.na || result.adsorption.Va,
      p: result.adsorption.p0,
    },
    {
      dataType: 'Adsorption Isotherm',
      title: result.meta.COMMENT1,
      meta: result.meta,
    },
  );

  analysis.pushSpectrum(
    {
      x: result.desorption['p/p0'],
      y: result.desorption.na || result.adsorption.Va,
      p: result.desorption.p0,
    },
    {
      dataType: 'Desorption Isotherm',
      title: result.meta.COMMENT1,
      meta: result.meta,
    },
  );

  return analysis;
}
