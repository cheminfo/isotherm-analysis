import { Analysis } from 'common-spectrum';
import { read, utils } from 'xlsx';

function getCourse(data) {
  if (data.pressure[0] > data.pressure[data.pressure.length - 1]) {
    return 'Desorption Isotherm';
  } else {
    return 'Adsorption Isotherm';
  }
}

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
  let blocks = identifyBlocks(adsDesSheet);
  const analysis = new Analysis();
  for (let i = 0; i < blocks.metaDataBlocks.length; i++) {
    let metaData = parseIGAMeasurmentHeader(
      adsDesSheet,
      blocks.metaDataBlocks[i],
    );

    let data = parseDataBlock(adsDesSheet, blocks.dataBlocks[i]);

    let course = getCourse(data);
    let spectrum;
    if ('pp0' in data) {
      spectrum = {
        x: {
          data: data.pressure,
          label: 'Pressure',
          isDependent: false,
          units: 'kPa',
        },
        y: {
          data: data.excessAdsorption,
          label: 'Excess Adsorption [mmol/g]',
          isDependent: true,
          units: 'mmol/g',
        },
        p: {
          data: data.pp0,
          label: 'relative pressure',
          isDependent: false,
          units: '',
        },
        r: {
          data: data.excessAdsorptionPercentage,
          label: 'Excess Adsorption',
          isDependent: true,
          units: '%',
        },
        t: {
          data: data.sampleT,
          label: 'Sample Temperature',
          isDependent: false,
          units: '°C',
        },
      };
    } else {
      spectrum = {
        x: {
          data: data.pressure,
          label: 'Pressure',
          isDependent: false,
          units: 'kPa',
        },
        y: {
          data: data.excessAdsorption,
          label: 'Excess Adsorption',
          isDependent: true,
          units: 'g/g',
        },
        r: {
          data: data.wtPercent,
          label: 'Excess Adsorption',
          isDependent: true,
          units: '%',
        },
        t: {
          data: data.sampleT,
          label: 'Sample Temperature',
          isDependent: false,
          units: '°C',
        },
      };
    }

    analysis.pushSpectrum(spectrum, {
      dataType: course,
      title: metaData.title ? metaData.title : 'IGA Isotherm',
      meta: metaData,
    });
  }
  return analysis;
}

/**
 * Parses and standardizes the metadata
 *
 * @param {string[]} lines
 * @returns {object}
 */
function parseIGAMeasurmentHeader(sheet, rowRange) {
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
  return metaData;
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
  return dataBlock;
}

function identifyBlocks(sheet) {
  // in the excel sheet, find the relevant start and end rows for the data and metadata
  // blocks.
  // Metadatablocks start with "System Type" and end with "Scan Commenced"
  // The Data blocks continue from there and end at "Scan Ends"
  let metaDataBlockStarts = [];
  let metaDataBlockEnds = [];
  let dataBlockStarts = [];
  let dataBlockEnds = [];
  let range = utils.decode_range(sheet['!ref']);
  for (let i = 0; i < range.e.r; i++) {
    let cell = sheet[`A${i}`];
    if (cell && cell.v === 'System Type') {
      metaDataBlockStarts.push(i);
    }
    if (cell && cell.v === 'Scan Commenced') {
      metaDataBlockEnds.push(i);
    }
    if (cell && cell.v === '(mbar)') {
      dataBlockStarts.push(i + 1);
    }
    if (cell && cell.v === 'Scan Ends') {
      dataBlockEnds.push(i - 2);
    }
  }
  // now compile them to objects that contain the start and end rows for each block
  let metaDataBlocks = [];
  let dataBlocks = [];
  for (let i = 0; i < metaDataBlockStarts.length; i++) {
    metaDataBlocks.push({
      start: metaDataBlockStarts[i],
      end: metaDataBlockEnds[i],
    });
  }
  for (let i = 0; i < dataBlockStarts.length; i++) {
    dataBlocks.push({
      start: dataBlockStarts[i],
      end: dataBlockEnds[i],
    });
  }

  if (metaDataBlocks.length !== dataBlocks.length) {
    throw new Error(
      'Number of metadata blocks does not match number of data blocks',
    );
  }

  return {
    metaDataBlocks,
    dataBlocks,
  };
}
