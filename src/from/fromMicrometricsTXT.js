import { Analysis } from '..';

import { lineSplit } from './utils';

function parseMetaBlock(lines, dataStartIndex) {
  let meta = {};
  for (let i = dataStartIndex - 13; i < dataStartIndex; i++) {
    if (lines[i].match('Sample: ')) {
      meta.sample = lineSplit(lines[i])[2].trim();
    }
    if (lines[i].match('Operator:  ')) {
      meta.operator = lineSplit(lines[i])[1].trim();
    }
    if (lines[i].match('Submitter: ')) {
      meta.submitter = lineSplit(lines[i])[1].trim();
    }
    if (lines[i].match('File: ')) {
      meta.file = lineSplit(lines[i])[2].trim();
    }
    if (lines[i].match('Started: ')) {
      meta.started = lineSplit(lines[i])[2].trim();
    }
    if (lines[i].match('Analysis adsorptive: ')) {
      meta.adsorptive = lineSplit(lines[i])[4].trim();
    }
    if (lines[i].match('Completed: ')) {
      meta.completed = lineSplit(lines[i])[2].trim();
    }
    if (lines[i].match('Equilibration time: ')) {
      let time = lineSplit(lines[i])[4].trim().split(' ');
      meta.equilibrationTime = parseFloat(time[0]);
      meta.equilibrationTimeUnit = time[1];
    }
    if (lines[i].match('Report time: ')) {
      meta.reportTime = lineSplit(lines[i])[2].trim();
    }
    if (lines[i].match('Sample mass: ')) {
      let mass = lineSplit(lines[i])[2].trim().split(' ');
      meta.sampleWeight = parseFloat(mass[0]);
      meta.sampleWeightUnit = mass[1];
    }
    if (lines[i].match('Gemini model: ')) {
      meta.model = lineSplit(lines[i])[4].trim();
    }
    if (lines[i].match('Sample density: ')) {
      let density = lineSplit(lines[i])[3].split(' ');
      meta.sampleDensity = parseFloat(density[0]);
      meta.sampleDensityUnit = density[1];
    }
    if (lines[i].match('Evac. rate:  ')) {
      let evacRate = lineSplit(lines[i])[2].split(' ');
      meta.evacRate = parseFloat(evacRate[0]);
      meta.evacRateUnit = evacRate[1];
    }
  }
  return meta;
}
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
  let type = 'Adsorption Isotherm';
  for (let i = 0; i < startsAndEnds[0].length; i++) {
    data = parseIsothermTable(
      lines.slice(startsAndEnds[0][i], startsAndEnds[1][i]),
    );

    let meta = parseMetaBlock(lines, startsAndEnds[0][i]);
    meta.pSat = data.pSat;

    if (data.x[1] > data.x[data.x.length - 1]) {
      type = 'Desorption Isotherm';
    }
    analysis.pushSpectrum(
      {
        x: {
          data: data.x,
          label: 'relative pressure',
          type: 'independent',
        },
        y: {
          data: data.y,
          label: 'Excess Adsorption [mmol/g]',
          type: 'dependent',
        },
        p: {
          data: data.p,
          label: 'Pressure [kPa]',
          type: 'independent',
        },
      },
      {
        dataType: type,
        title: meta.sample,
        meta: meta,
      },
    );
  }

  return analysis;
}

export const testables = {
  findDataBlocks: findDataBlocks,
  parseIsothermTable: parseIsothermTable,
  parseMetaBlock: parseMetaBlock,
};
