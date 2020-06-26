import { Analysis } from '..';

function lineSplitTrim(line) {
  return line.split(/\s{4,}/)[1].trim();
}

function parseIGAMeasurmentHeader(lines) {
  let metaData = {};
  // Let's use some cleaner names
  metaData.SystemType = lineSplitTrim(lines[0]);
  metaData.SystemOwner = lineSplitTrim(lines[1]);
  metaData.SystemReference = lineSplitTrim(lines[2]);
  metaData.SystemSerialNumber = lineSplitTrim(lines[3]);
  metaData.SampleNumber = lineSplitTrim(lines[4]);
  metaData.ExperimentType = lineSplitTrim(lines[5]);
  metaData.ExperimentNumber = parseInt(lineSplitTrim(lines[6]));
  metaData.Title = lineSplitTrim(lines[7]);
  metaData.Comment = lineSplitTrim(lines[8]);
  metaData.Source = lineSplitTrim(lines[9]);
  metaData.Batch = lineSplitTrim(lines[10]);
  metaData.ID = lineSplitTrim(lines[11]);
  metaData.ExperimentTitle = lineSplitTrim(lines[12]);
  let tmp = lineSplitTrim(lines[14]).split(/\s/);
  metaData.SampleWeight = parseFloat(tmp[0]);
  metaData.SampleWeightUnit = tmp[1];

  tmp = lineSplitTrim(lines[15]).split(/\s/);
  metaData.SampleWeightDry = parseFloat(tmp[0]);
  metaData.SampleWeightDryUnit = tmp[1];

  tmp = lineSplitTrim(lines[18]).split(/\s/);
  metaData.BalanceTrimV = parseFloat(tmp[0]);
  metaData.BalanceTrimVUnit = tmp[1];

  metaData.BalanceTrimT = lineSplitTrim(lines[19]);

  tmp = lineSplitTrim(lines[20]).split(/\s/);
  metaData.CounterWeightM = parseFloat(tmp[0]);
  metaData.CounterWeightMUnit = tmp[1];

  tmp = lineSplitTrim(lines[21]).split(/\s/);
  metaData.CounterWeightRho = parseFloat(tmp[0]);
  metaData.CounterWeightRhoUnit = tmp[1];

  metaData.CounterWeightT = lineSplitTrim(lines[22]);

  tmp = lineSplitTrim(lines[23]).split(/\s/);
  metaData.TungstenM = parseFloat(tmp[0]);
  metaData.TungstenMUnit = tmp[1];

  tmp = lineSplitTrim(lines[24]).split(/\s/);
  metaData.TungstenRho = parseFloat(tmp[0]);
  metaData.TungstenRhoUnit = tmp[1];

  metaData.CounterWeightT = lineSplitTrim(lines[25]);

  tmp = lineSplitTrim(lines[26]).split(/\s/);
  metaData.ChainExcessM = parseFloat(tmp[0]);
  metaData.ChainExcessMUnit = tmp[1];

  tmp = lineSplitTrim(lines[27]).split(/\s/);
  metaData.ChainExcessRho = parseFloat(tmp[0]);
  metaData.ChainExcessRhoUnit = tmp[1];

  metaData.ChainExcessT = lineSplitTrim(lines[28]);

  metaData.ApplicationCode = lineSplitTrim(lines[44]);
  metaData.Mode = lineSplitTrim(lines[44]);
  metaData.Source = lineSplitTrim(lines[45]);
  metaData.GasSource = lineSplitTrim(lines[46]);
  metaData.Vessel = lineSplitTrim(lines[47]);
  metaData.Reactor = lineSplitTrim(lines[48]);
  metaData.PressureSensor = lineSplitTrim(lines[49]);
  metaData.Thermostat = lineSplitTrim(lines[50]);

  metaData.NitrogenEOS = lineSplitTrim(lines[51]);
  metaData.NitrogenSVP = lineSplitTrim(lines[52]);

  metaData.SeriesType = lineSplitTrim(lines[59]);

  metaData.Scan = parseInt(lineSplitTrim(lines[61]));
  metaData.Course = lineSplitTrim(lines[62]);
  metaData.ReferenceStateDevice = lineSplitTrim(lines[63]);
  metaData.ScanTitle = lineSplitTrim(lines[64]);
  metaData.ScanStart = lineSplitTrim(lines[65]);

  return metaData;
}

function getLineNumbersOfMeasurement(lines) {
  let starts = [];
  let ends = [];
  for (let [index, line] of lines.entries()) {
    if (line.match('S E R I E S   D A T A   R E C O R D')) {
      starts.push(index);
    } else if (line.match('Scan Ends ')) {
      ends.push(index);
    }
  }
  return [starts, ends];
}

function parseDataBlock(lines) {
  let dataBlock = {
    pressure: [],
    gasDensity: [],
    pp0: [],
    totalWeight: [],
    BET: [],
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
    dataBlock.BET.push(parseFloat(tmp[6]));
    dataBlock.sampleT.push(parseFloat(tmp[7]));
    dataBlock.wtPercent.push(parseFloat(tmp[8]));
  }
  return dataBlock;
}

/**
 * Creates a new Analysis element
 * @param {string} text - String containing the IGA analysis data, maybe contain multiple measurements
 * @return {Analysis} - New class element with the given data
 */
export function fromIGA(text) {
  const lines = text.split(/[\r\n]+/);

  //     let parsed = Papa.parse(text, {
  //     skipEmptyLines: true,
  //     header: true,
  //     dynamicTyping: true,
  //   }).data;

  //   let analysis = new Analysis();
  //   analysis.pushSpectrum(
  //     {
  //       x: {
  //         data: parsed.map((d) => d['Program Temperature']),
  //         label: 'Program temperature [°C]',
  //       },
  //       y: {
  //         data: parsed.map((d) => d['Unsubtracted Weight']),
  //         label: 'Weight [mg]',
  //       },
  //       t: {
  //         data: parsed.map((d) => d['Sample Temperature']),
  //         label: 'Sample temperature [°C]',
  //       },
  //     },
  //     { dataType: 'TGA' },
  //   );

  //   analysis.pushSpectrum(
  //     {
  //       x: { data: parsed.map((d) => d.Time), label: 'Time [s]' },
  //       y: {
  //         data: parsed.map((d) => d['Unsubtracted Weight']),
  //         label: 'Weight [mg]',
  //       },
  //     },
  //     { dataType: 'TGA' },
  //   );
  return analysis;
}

export const testables = {
  getLineNumbersOfMeasurement: getLineNumbersOfMeasurement,
  parseIGAMeasurmentHeader: parseIGAMeasurmentHeader,
  parseDataBlock: parseDataBlock,
};
