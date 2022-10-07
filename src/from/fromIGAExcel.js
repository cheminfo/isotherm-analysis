import { Analysis } from 'common-spectrum';
import { read, utils } from 'xlsx';

/**
 * Orchestrates the parsing of a Belsorp Excel (xls) file.
 *
 * @export
 * @param {Buffer} dataFile input excel file, e.g., read with readfilesync
 * @returns {Analysis}
 */
export function fromIGAExcel(dataFile) {
  const workbook = read(dataFile);
  const adsDesSheet = workbook.Sheets[workbook.SheetNames[0]];
  ///console.log(adsDesSheet[utils.encode_cell({ r: 0, c: 1 })]);
  parseIGAMeasurmentHeader({ start: 0, end: 76 }, adsDesSheet);
  parseDataBlock(adsDesSheet, { start: 82, end: 95 });
  return new Analysis();
}

// metaData.systemType = lineSplitTrim(lines[0]);
//   metaData.systemOwner = lineSplitTrim(lines[1]);
//   metaData.systemReference = lineSplitTrim(lines[2]);
//   metaData.systemSerialNumber = lineSplitTrim(lines[3]);
//   metaData.sampleNumber = lineSplitTrim(lines[4]);
//   metaData.experimentType = lineSplitTrim(lines[5]);
//   // eslint-disable-next-line radix
//   metaData.experimentNumber = parseInt(lineSplitTrim(lines[6]));
//   metaData.title = lineSplitTrim(lines[7]);
//   metaData.comment = lineSplitTrim(lines[8]);
//   metaData.source = lineSplitTrim(lines[9]);
//   metaData.batch = lineSplitTrim(lines[10]);
//   metaData.id = lineSplitTrim(lines[11]);
//   metaData.experimentTitle = lineSplitTrim(lines[12]);
//   let tmp = lineSplitTrim(lines[14]).split(/\s/);
//   metaData.sampleWeight = parseFloat(tmp[0]);
//   metaData.sampleWeightunits = tmp[1];

//   tmp = lineSplitTrim(lines[15]).split(/\s/);
//   metaData.sampleWeightDry = parseFloat(tmp[0]);
//   metaData.sampleWeightDryunits = tmp[1];

//   tmp = lineSplitTrim(lines[18]).split(/\s/);
//   metaData.balanceTrimV = parseFloat(tmp[0]);
//   metaData.balanceTrimVunits = tmp[1];

//   metaData.balanceTrimT = lineSplitTrim(lines[19]);

//   tmp = lineSplitTrim(lines[20]).split(/\s/);
//   metaData.counterWeightM = parseFloat(tmp[0]);
//   metaData.counterWeightMunits = tmp[1];

//   tmp = lineSplitTrim(lines[21]).split(/\s/);
//   metaData.counterWeightRho = parseFloat(tmp[0]);
//   metaData.counterWeightRhounits = tmp[1];

//   metaData.counterWeightT = lineSplitTrim(lines[22]);

//   tmp = lineSplitTrim(lines[23]).split(/\s/);
//   metaData.tungstenM = parseFloat(tmp[0]);
//   metaData.tungstenMunits = tmp[1];

//   tmp = lineSplitTrim(lines[24]).split(/\s/);
//   metaData.tungstenRho = parseFloat(tmp[0]);
//   metaData.tungstenRhounits = tmp[1];

//   metaData.counterWeightT = lineSplitTrim(lines[25]);

//   tmp = lineSplitTrim(lines[26]).split(/\s/);
//   metaData.chainExcessM = parseFloat(tmp[0]);
//   metaData.chainExcessMunits = tmp[1];

//   tmp = lineSplitTrim(lines[27]).split(/\s/);
//   metaData.chainExcessRho = parseFloat(tmp[0]);
//   metaData.chainExcessRhounits = tmp[1];

//   metaData.chainExcessT = lineSplitTrim(lines[28]);

//   metaData.applicationCode = lineSplitTrim(lines[44]);
//   metaData.mode = lineSplitTrim(lines[44]);
//   metaData.source = lineSplitTrim(lines[45]);
//   metaData.gasSource = lineSplitTrim(lines[46]);
//   metaData.vessel = lineSplitTrim(lines[47]);
//   metaData.reactor = lineSplitTrim(lines[48]);
//   metaData.pressureSensor = lineSplitTrim(lines[49]);
//   metaData.thermostat = lineSplitTrim(lines[50]);

//   metaData.nitrogenEOS = lineSplitTrim(lines[51]);
//   metaData.nitrogenSVP = lineSplitTrim(lines[52]);

//   metaData.seriesType = lineSplitTrim(lines[59]);

//   metaData.scan = parseInt(lineSplitTrim(lines[61]), 10);
//   metaData.course = lineSplitTrim(lines[62]);
//   metaData.referenceStateDevice = lineSplitTrim(lines[63]);
//   metaData.scanTitle = lineSplitTrim(lines[64]);
//   metaData.scanStart = lineSplitTrim(lines[65]);

/**
 * Parses and standardizes the metadata
 *
 * @param {string[]} lines
 * @returns {object}
 */
function parseIGAMeasurmentHeader(rowRange, sheet) {
  let metaData = {};
  // loop over the rows in the sheet and extract the values
  for (let i = rowRange.start; i < rowRange.end; i++) {
    let row = sheet[`A${i}`];
    let value = sheet[`B${i}`];
    if (row && value) {
      let name = row.v.trim();
      if (name === 'System Type') {
        metaData.systemType = value.v.trim();
      }
      if (name === 'System Owner') {
        metaData.systemOwner = value.v.trim();
      }
      if (name === 'System Reference') {
        metaData.systemReference = value.v.trim();
      }
      if (name === 'System Serial Number') {
        metaData.systemSerialNumber = value.v.trim();
      }
      if (name === 'Experiment Type') {
        metaData.experimentType = value.v.trim();
      }
      if (name === 'Experiment Number') {
        metaData.experimentNumber = value.v.trim();
      }
      if (name === 'Title') {
        metaData.title = value.v.trim();
      }
      if (name === 'Comment') {
        metaData.comment = value.v.trim();
      }
      if (name === 'Source') {
        metaData.source = value.v.trim();
      }
      if (name === 'Batch') {
        metaData.batch = value.v.trim();
      }
      if (name === 'ID') {
        metaData.id = value.v.trim();
      }
      if (name === 'Experiment Title') {
        metaData.experimentTitle = value.v.trim();
      }
      if (name === 'Sample Wet Weight') {
        metaData.sampleWetWeight = parseFloat(value.v.split(/\s/)[0]);
        metaData.sampleWetWeightUnits = value.v.split(/\s/)[1];
      }
      if (name === 'Sample Dry Weight') {
        metaData.sampleDryWeight = parseFloat(value.v.split(/\s/)[0]);
        metaData.sampleDryWeightUnits = value.v.split(/\s/)[1];
      }
      if (name === 'Balance Trim (V)') {
        metaData.balanceTrimVolume = parseFloat(value.v.split(/\s/)[0]);
        metaData.balanceTrimVolumeUnits = value.v.split(/\s/)[1];
      }
      if (name === 'Balance Trim (T)') {
        metaData.balanceTrimType = value.v.trim();
      }
      if (name === 'Counterweight (M)') {
        metaData.counterWeightMass = parseFloat(value.v.split(/\s/)[0]);
        metaData.counterWeightMassUnits = value.v.split(/\s/)[1];
      }
      if (name === 'Counterweight (T)') {
        metaData.counterWeightType = value.v.trim();
      }
      if (name === 'Tungsten (M)') {
        metaData.tungstenMass = parseFloat(value.v.split(/\s/)[0]);
        metaData.tungstenMassUnits = value.v.split(/\s/)[1];
      }
      if (name === 'Tungsten (T)') {
        metaData.tungstenType = value.v.trim();
      }
      if (name === 'Chain Excess (M)') {
        metaData.chainExcessMass = parseFloat(value.v.split(/\s/)[0]);
        metaData.chainExcessMassUnits = value.v.split(/\s/)[1];
      }
      if (name === 'Chain Excess (T)') {
        metaData.chainExcessType = value.v.trim();
      }
      if (name === 'Application Code') {
        metaData.applicationCode = value.v;
      }
      if (name === 'Mode') {
        metaData.mode = value.v.trim();
      }
      if (name === 'Gas Source') {
        metaData.gasSource = value.v.trim();
      }
      if (name === 'Vessel') {
        metaData.vessel = value.v.trim();
      }
      if (name === 'Reactor') {
        metaData.reactor = value.v.trim();
      }
      if (name === 'Pressure Sensor') {
        metaData.pressureSensor = value.v.trim();
      }
      if (name === 'Thermostat') {
        metaData.thermostat = value.v.trim();
      }
      if (name.includes('EOS')) {
        metaData.EOS = value.v.trim();
      }
      if (name.includes('SVP')) {
        metaData.SVP = value.v.trim();
      }
      if (name === 'Series Type') {
        metaData.seriesType = value.v.trim();
      }
      if (name === 'Scan') {
        metaData.scan = value.v;
      }
      if (name === 'Course') {
        metaData.course = value.v.trim();
      }
      if (name === 'Reference State Device') {
        metaData.referenceStateDevice = value.v.trim();
      }
      if (name === 'Scan Title') {
        metaData.scanTitle = value.v.trim();
      }
      if (name === 'Scan Start') {
        metaData.scanStart = value.v.trim();
      }
    }
  }
  console.log(metaData);
}

function parseDataBlock(sheet, rowRange) {
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
  for (let i = rowRange.start; i <= rowRange.end; i++) {
    dataBlock.pressure.push(parseFloat(sheet[`A${i}`].v));
    dataBlock.gasDensity.push(parseFloat(sheet[`B${i}`].v));
    dataBlock.pp0.push(parseFloat(sheet[`C${i}`].v));
    dataBlock.totalWeight.push(parseFloat(sheet[`D${i}`].v));
    dataBlock.excessAdsorptionPercentage.push(parseFloat(sheet[`E${i}`].v));
    dataBlock.excessAdsorption.push(parseFloat(sheet[`F${i}`].v));
    dataBlock.bet.push(parseFloat(sheet[`G${i}`].v));
    dataBlock.sampleT.push(parseFloat(sheet[`H${i}`].v));
  }
  console.log(dataBlock);
  return dataBlock;
}
