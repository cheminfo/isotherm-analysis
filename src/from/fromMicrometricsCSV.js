import { Analysis } from 'common-spectrum';
import Papa from 'papaparse';

import { idealGasConstant } from './constants';

/**
 * Create an Analysis object from a micrometrics CSV file
 *
 * @export
 * @param {string} text
 * @returns {Analysis}
 */
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
  try {
    analysis.pushSpectrum(
      {
        //FixMe: this should be p
        x: {
          data: arrayColumn(parsed, 0)
            .filter((value) => {
              return value !== '';
            })
            .map((x) => {
              return parseFloat(x);
            }),
          label: 'relative pressure p/p0',
          isDependent: false,
          units: '',
        },
        y: {
          data: arrayColumn(parsed, 1)
            .filter((value) => {
              return value !== '';
            })
            .map((x) => {
              return (parseFloat(x) / idealGasConstant) * 1000;
            }),
          label: 'Excess adsorption',
          isDependent: false,
          units: 'mmol/g',
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
            .filter((value) => {
              return value !== '';
            })
            .map((x) => {
              return parseFloat(x);
            }),
          label: 'relative pressure p/p0',
          isDependent: false,
          units: '',
        },
        y: {
          data: arrayColumn(parsed, 3)
            .filter((value) => {
              return value !== '';
            })
            .map((x) => {
              return (parseFloat(x) / idealGasConstant) * 1000;
            }),
          label: 'Excess adsorption',
          isDependent: true,
          units: 'mmol/g',
        },
      },
      {
        dataType: 'Desorption Isotherm',
        title: 'Desorption',
        meta: {},
      },
    );
  } catch (err) {
    throw Error(
      `Could not parse desorption section due to ${err}. Please report an issue with an example file!`,
    );
  }

  return analysis;
}
