import Papa from 'papaparse';

import { Analysis } from '..';

import { idealGasConstant } from './constants';

export function fromMicrometricsCSV(text) {
  text = text.replace(/,/g, '.');
  let parsed = Papa.parse(text, {
    delimiter: ';',
    dynamicTyping: false,
    skipEmptyLines: true,
  }).data;

  const arrayColumn = (arr, n) => arr.map((x) => x[n]);

  const headerRow = parsed.shift();

  let analysis = new Analysis();

  analysis.pushSpectrum(
    {
      x: {
        data: arrayColumn(parsed, 0)
          .filter(function (value) {
            return value !== '';
          })
          .map(function (x) {
            return parseFloat(x);
          }),
        label: 'relative pressure p/p0',
        type: 'independent',
      },
      y: {
        data: arrayColumn(parsed, 1)
          .filter(function (value) {
            return value !== '';
          })
          .map(function (x) {
            return (parseFloat(x) / idealGasConstant) * 1000;
          }),
        label: 'Excess adsorption mmol /g',
        type: 'dependent',
      },
    },
    {
      dataType: 'Adsorption Isotherm',
      title: 'Adsorption',
      meta: { header: headerRow },
    },
  );

  analysis.pushSpectrum(
    {
      x: {
        data: arrayColumn(parsed, 2)
          .filter(function (value) {
            return value !== '';
          })
          .map(function (x) {
            return parseFloat(x);
          }),
        label: 'relative pressure p/p0',
        type: 'independent',
      },
      y: {
        data: arrayColumn(parsed, 3)
          .filter(function (value) {
            return value !== '';
          })
          .map(function (x) {
            return (parseFloat(x) / idealGasConstant) * 1000;
          }),
        label: 'Excess adsorption mmol /g',
        type: 'dependent',
      },
    },
    {
      dataType: 'Desorption Isotherm',
      title: 'Desorption',
      meta: {},
    },
  );

  return analysis;
}
