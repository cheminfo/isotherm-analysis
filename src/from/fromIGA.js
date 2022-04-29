import mean from 'ml-array-mean';

import { Analysis } from '..';

import { lineSplitTrim } from './utils';

/**
 * Parses and standardizes the metadata
 *
 * @param {string[]} lines
 * @returns {object}
 */
function parseIGAMeasurmentHeader(lines) {
  let metaData = {};
  // Let's use some cleaner names
  metaData.systemType = lineSplitTrim(lines[0]);
  metaData.systemOwner = lineSplitTrim(lines[1]);
  metaData.systemReference = lineSplitTrim(lines[2]);
  metaData.systemSerialNumber = lineSplitTrim(lines[3]);
  metaData.sampleNumber = lineSplitTrim(lines[4]);
  metaData.experimentType = lineSplitTrim(lines[5]);
  // eslint-disable-next-line radix
  metaData.experimentNumber = parseInt(lineSplitTrim(lines[6]));
  metaData.title = lineSplitTrim(lines[7]);
  metaData.comment = lineSplitTrim(lines[8]);
  metaData.source = lineSplitTrim(lines[9]);
  metaData.batch = lineSplitTrim(lines[10]);
  metaData.id = lineSplitTrim(lines[11]);
  metaData.experimentTitle = lineSplitTrim(lines[12]);
  let tmp = lineSplitTrim(lines[14]).split(/\s/);
  metaData.sampleWeight = parseFloat(tmp[0]);
  metaData.sampleWeightunits = tmp[1];

  tmp = lineSplitTrim(lines[15]).split(/\s/);
  metaData.sampleWeightDry = parseFloat(tmp[0]);
  metaData.sampleWeightDryunits = tmp[1];

  tmp = lineSplitTrim(lines[18]).split(/\s/);
  metaData.balanceTrimV = parseFloat(tmp[0]);
  metaData.balanceTrimVunits = tmp[1];

  metaData.balanceTrimT = lineSplitTrim(lines[19]);

  tmp = lineSplitTrim(lines[20]).split(/\s/);
  metaData.counterWeightM = parseFloat(tmp[0]);
  metaData.counterWeightMunits = tmp[1];

  tmp = lineSplitTrim(lines[21]).split(/\s/);
  metaData.counterWeightRho = parseFloat(tmp[0]);
  metaData.counterWeightRhounits = tmp[1];

  metaData.counterWeightT = lineSplitTrim(lines[22]);

  tmp = lineSplitTrim(lines[23]).split(/\s/);
  metaData.tungstenM = parseFloat(tmp[0]);
  metaData.tungstenMunits = tmp[1];

  tmp = lineSplitTrim(lines[24]).split(/\s/);
  metaData.tungstenRho = parseFloat(tmp[0]);
  metaData.tungstenRhounits = tmp[1];

  metaData.counterWeightT = lineSplitTrim(lines[25]);

  tmp = lineSplitTrim(lines[26]).split(/\s/);
  metaData.chainExcessM = parseFloat(tmp[0]);
  metaData.chainExcessMunits = tmp[1];

  tmp = lineSplitTrim(lines[27]).split(/\s/);
  metaData.chainExcessRho = parseFloat(tmp[0]);
  metaData.chainExcessRhounits = tmp[1];

  metaData.chainExcessT = lineSplitTrim(lines[28]);

  metaData.applicationCode = lineSplitTrim(lines[44]);
  metaData.mode = lineSplitTrim(lines[44]);
  metaData.source = lineSplitTrim(lines[45]);
  metaData.gasSource = lineSplitTrim(lines[46]);
  metaData.vessel = lineSplitTrim(lines[47]);
  metaData.reactor = lineSplitTrim(lines[48]);
  metaData.pressureSensor = lineSplitTrim(lines[49]);
  metaData.thermostat = lineSplitTrim(lines[50]);

  metaData.nitrogenEOS = lineSplitTrim(lines[51]);
  metaData.nitrogenSVP = lineSplitTrim(lines[52]);

  metaData.seriesType = lineSplitTrim(lines[59]);

  metaData.scan = parseInt(lineSplitTrim(lines[61]), 10);
  metaData.course = lineSplitTrim(lines[62]);
  metaData.referenceStateDevice = lineSplitTrim(lines[63]);
  metaData.scanTitle = lineSplitTrim(lines[64]);
  metaData.scanStart = lineSplitTrim(lines[65]);

  return metaData;
}

/**
 * Find the start and end line numbers of the measurement
 *
 * @param {Array<string>} lines
 * @returns {Array<number>} Array of length 2 [startIndex, endIndex]
 */
function getLineNumbersOfMeasurement(lines) {
  let starts = [];
  let ends = [];
  for (let [index, line] of lines.entries()) {
    if (line.match('S E R I E S   D A T A   R E C O R D')) {
      starts.push(index);
    } else if (line.match('Scan Ends ')) {
      ends.push(index + 2);
    }
  }
  return [starts, ends];
}

function parseIGADataBlock(lines) {
  let dataBlock = {
    pressure: [],
    gasDensity: [],
    pp0: [],
    totalWeight: [],
    bet: [],
    excessAdsorptionPercentage: [],
    excessAdsorption: [],
    sampleT: [],
    wtPercent: [],
  };

  for (let line of lines) {
    let tmp = line.split(/\s{3,}/);
    dataBlock.pressure.push(parseFloat(tmp[0]) * 0.1);
    dataBlock.gasDensity.push(parseFloat(tmp[1]));
    dataBlock.pp0.push(parseFloat(tmp[2]));
    dataBlock.totalWeight.push(parseFloat(tmp[3]));
    dataBlock.excessAdsorptionPercentage.push(parseFloat(tmp[4]));
    dataBlock.excessAdsorption.push(parseFloat(tmp[5]));
    dataBlock.bet.push(parseFloat(tmp[6]));
    dataBlock.sampleT.push(parseFloat(tmp[7]));
    dataBlock.wtPercent.push(parseFloat(tmp[8]));
  }
  return dataBlock;
}

function parseNonBETData(lines, sampleWeight) {
  let dataBlock = {
    pressure: [],
    gasDensity: [],
    totalWeight: [],
    sampleT: [],
    wtPercent: [],
    excessAdsorption: [],
  };
  for (let line of lines) {
    let tmp = line.split(/\s{3,}/);
    dataBlock.pressure.push(parseFloat(tmp[0]) * 0.1);
    dataBlock.gasDensity.push(parseFloat(tmp[1]));
    dataBlock.totalWeight.push(parseFloat(tmp[2]));
    dataBlock.sampleT.push(parseFloat(tmp[3]));
    let wtPercent = parseFloat(tmp[4]);
    dataBlock.wtPercent.push(wtPercent);
    dataBlock.excessAdsorption.push(wtPercent * sampleWeight);
  }
  return dataBlock;
}

function parseOneIGA(lines) {
  const measLen = lines.length;
  let meta = parseIGAMeasurmentHeader(lines.slice(2, 68));
  let dataBlock;
  if (lines[68].match('BET')) {
    dataBlock = parseIGADataBlock(lines.slice(72, measLen - 3));
  } else {
    dataBlock = parseNonBETData(
      lines.slice(72, measLen - 3),
      meta.sampleWeightDry,
    );
  }
  meta.scanEnd = lineSplitTrim(lines[measLen - 2]);
  meta.scanReferenceState = lineSplitTrim(lines[measLen - 1]);
  return { meta: meta, data: dataBlock };
}

/**
 * Orchestrates the parsing of a IGA file. Creates a new Analysis element
 *
 * @param {string} text - String containing the IGA analysis data, maybe contain multiple measurements
 * @return {Analysis} - New class element with the given data
 */
export function fromIGA(text) {
  const lines = text.split(/[\r\n]+/);
  const lineNumbers = getLineNumbersOfMeasurement(lines);
  let analysis = new Analysis();
  for (let i = 0; i < lineNumbers[0].length; i++) {
    let meas = parseOneIGA(lines.slice(lineNumbers[0][i], lineNumbers[1][i]));

    meas.meta.adsorptionT = mean(meas.data.sampleT);
    meas.meta.adsorptionTunits = '°C';

    let spectrum;
    if ('pp0' in meas.data) {
      spectrum = {
        x: {
          data: meas.data.pressure,
          label: 'Pressure',
          type: 'independent',
          units: 'kPa',
        },
        y: {
          data: meas.data.excessAdsorption,
          label: 'Excess Adsorption [mmol/g]',
          type: 'dependent',
          units: 'mmol/g',
        },
        p: {
          data: meas.data.pp0,
          label: 'relative pressure',
          type: 'independent',
          units: '',
        },
        r: {
          data: meas.data.excessAdsorptionPercentage,
          label: 'Excess Adsorption',
          type: 'dependent',
          units: '%',
        },
        t: {
          data: meas.data.sampleT,
          label: 'Sample Temperature',
          type: 'independent',
          units: '°C',
        },
      };
    } else {
      spectrum = {
        x: {
          data: meas.data.pressure,
          label: 'Pressure',
          type: 'independent',
          units: 'kPa',
        },
        y: {
          data: meas.data.excessAdsorption,
          label: 'Excess Adsorption',
          type: 'dependent',
          units: 'g/g',
        },
        r: {
          data: meas.data.wtPercent,
          label: 'Excess Adsorption',
          type: 'dependent',
          units: '%',
        },
        t: {
          data: meas.data.sampleT,
          label: 'Sample Temperature',
          type: 'independent',
          units: '°C',
        },
      };
    }
    analysis.pushSpectrum(spectrum, {
      dataType: 'Adsorption Isotherm',
      title: meas.meta.experimentTitle,
      meta: meas.meta,
    });
  }

  return analysis;
}

export const testables = {
  getLineNumbersOfMeasurement: getLineNumbersOfMeasurement,
  parseIGAMeasurmentHeader: parseIGAMeasurmentHeader,
  parseIGADataBlock: parseIGADataBlock,
  parseOneIGA: parseOneIGA,
};
