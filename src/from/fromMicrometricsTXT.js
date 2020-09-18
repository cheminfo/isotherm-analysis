import { lineSplit } from './utils';
import { Analysis } from '..';

function findDataBlocks(lines) {
  let isothermTableStarts = [];
  let isothermTableEnds = [];
  let isIsothermTable = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match('Isotherm Tabular Report')) {
      isIsothermTable = true;
      isothermTableStarts.push(i);
    }

    if (isIsothermTable && lines[i].match('Micromeritics')) {
      isothermTableEnds.push(i);
      isIsothermTable = false;
    }
  }

  return [isothermTableStarts, isothermTableEnds];
}
function parseIsothermTable(lines) {
  let pSat = parseFloat(lines[5].trim() * 0.13332); // convert mmHg to kPa
  let data = {
    x: [],
    y: [],
    p: [],
  };
  data.pSat = pSat;
  let parts;
  for (let i = 6; i < lines.length; i++) {
    parts = lineSplit(lines[i]);
    data.x.push(parseFloat(parts[0]));
    data.y.push(parseFloat(parts[2]));
    data.p.push(parseFloat(parts[1]) * 0.13332); // convert mmHg to kPa
  }
  return data;
}

export function fromMicrometricsTXT(text) {
  const lines = text.split(/\r?\n/).filter((line) => !line.match(/^\s*$/));
  let startsAndEnds = findDataBlocks(lines);
  let analysis = new Analysis();
  let data;
  for (let i = 0; i < startsAndEnds[0].length; i++) {
    data = parseIsothermTable(
      lines.slice(startsAndEnds[0][i], startsAndEnds[1][i]),
    );

    analysis.pushSpectrum({
      x: {
        data: data.x,
        label: 'relative pressure',
      },
      y: {
        data: data.y,
        label: 'Excess Adsorption [mmol/g]',
      },
      p: {
        data: data.p,
        label: 'Pressure [kPa]',
      },
    });
  }

  return analysis;
}

export const testables = {
  findDataBlocks: findDataBlocks,
  parseIsothermTable: parseIsothermTable,
};
