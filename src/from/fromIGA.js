import { Analysis } from '..';

function lineSplitTrim(line) {
  return line.split(/\s{4,}/)[1].trim();
}

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
  metaData.sampleWeightUnit = tmp[1];

  tmp = lineSplitTrim(lines[15]).split(/\s/);
  metaData.sampleWeightDry = parseFloat(tmp[0]);
  metaData.sampleWeightDryUnit = tmp[1];

  tmp = lineSplitTrim(lines[18]).split(/\s/);
  metaData.balanceTrimV = parseFloat(tmp[0]);
  metaData.balanceTrimVUnit = tmp[1];

  metaData.balanceTrimT = lineSplitTrim(lines[19]);

  tmp = lineSplitTrim(lines[20]).split(/\s/);
  metaData.counterWeightM = parseFloat(tmp[0]);
  metaData.counterWeightMUnit = tmp[1];

  tmp = lineSplitTrim(lines[21]).split(/\s/);
  metaData.counterWeightRho = parseFloat(tmp[0]);
  metaData.counterWeightRhoUnit = tmp[1];

  metaData.counterWeightT = lineSplitTrim(lines[22]);

  tmp = lineSplitTrim(lines[23]).split(/\s/);
  metaData.tungstenM = parseFloat(tmp[0]);
  metaData.tungstenMUnit = tmp[1];

  tmp = lineSplitTrim(lines[24]).split(/\s/);
  metaData.tungstenRho = parseFloat(tmp[0]);
  metaData.tungstenRhoUnit = tmp[1];

  metaData.counterWeightT = lineSplitTrim(lines[25]);

  tmp = lineSplitTrim(lines[26]).split(/\s/);
  metaData.chainExcessM = parseFloat(tmp[0]);
  metaData.chainExcessMUnit = tmp[1];

  tmp = lineSplitTrim(lines[27]).split(/\s/);
  metaData.chainExcessRho = parseFloat(tmp[0]);
  metaData.chainExcessRhoUnit = tmp[1];

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

  // eslint-disable-next-line radix
  metaData.scan = parseInt(lineSplitTrim(lines[61]));
  metaData.course = lineSplitTrim(lines[62]);
  metaData.referenceStateDevice = lineSplitTrim(lines[63]);
  metaData.scanTitle = lineSplitTrim(lines[64]);
  metaData.scanStart = lineSplitTrim(lines[65]);

  return metaData;
}

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
    dataBlock.pressure.push(parseFloat(tmp[0]));
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

function parseOneIGA(lines) {
  const measLen = lines.length;
  let meta = parseIGAMeasurmentHeader(lines.slice(2, 68));
  const dataBlock = parseIGADataBlock(lines.slice(72, measLen - 3));
  meta.scanEnd = lineSplitTrim(lines[measLen - 2]);
  meta.scanReferenceState = lineSplitTrim(lines[measLen - 1]);
  return { meta: meta, data: dataBlock };
}
/**
 * Creates a new Analysis element
 * @param {string} text - String containing the IGA analysis data, maybe contain multiple measurements
 * @return {Analysis} - New class element with the given data
 */
export function fromIGA(text) {
  const lines = text.split(/[\r\n]+/);

  let analyses = [];
  const lineNumbers = getLineNumbersOfMeasurement(lines);
  for (let lineNumber of lineNumbers) {
    let meas = parseOneIGA(lines.slice(lineNumber[0], lineNumber[1]));

    let analysis = new Analysis();

    analysis.pushSpectrum(
      {
        x: {
          data: meas.data.pressure,
          label: 'Pressure  [mbar]',
        },
        y: {
          data: meas.data.excessAdsorption,
          label: 'Excess Adsorption [mmol/g]',
        },
      },
      {
        dataType: 'Isotherm',
        title: meas.meta.experimentTitle,
        meta: meas.meta,
      },
    );

    analysis.pushSpectrum(
      {
        x: {
          data: meas.data.pressure,
          label: 'Pressure  [mbar]',
        },
        y: {
          data: meas.data.excessAdsorptionPercentage,
          label: 'Excess Adsorption [%]',
        },
      },
      {
        dataType: 'Isotherm',
        title: meas.meta.experimentTitle,
        meta: meas.meta,
      },
    );

    analysis.pushSpectrum(
      {
        x: {
          data: meas.data.pp0,
          label: 'relative pressure',
        },
        y: {
          data: meas.data.excessAdsorption,
          label: 'Excess Adsorption [mmol/g]',
        },
      },
      {
        dataType: 'Isotherm',
        title: meas.meta.experimentTitle,
        meta: meas.meta,
      },
    );

    analyses.push(analysis);
  }

  return analyses;
}

export const testables = {
  getLineNumbersOfMeasurement: getLineNumbersOfMeasurement,
  parseIGAMeasurmentHeader: parseIGAMeasurmentHeader,
  parseIGADataBlock: parseIGADataBlock,
  parseOneIGA: parseOneIGA,
};
