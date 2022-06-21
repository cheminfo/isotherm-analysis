import { Analysis } from 'common-spectrum';
import { read, utils } from 'xlsx';

import { idealGasConstant } from './constants';

function valueElseUndefined(cell) {
  return cell ? cell.v : undefined;
}

function valueElseUndefinedFloat(cell) {
  return cell ? parseFloat(cell.v) : undefined;
}

function valueElseUndefinedInt(cell) {
  return cell ? parseFloat(cell.v) : undefined;
}

function valueElseUndefinedStripunits(cell) {
  let val = cell ? cell.v : undefined;
  return val.replace(']', '').replace('[', '');
}

/**
 * Find metadata in the excelsheet and safe it with
 * standardized names
 *
 * @param {object} adsDesSheet sheetjs worksheet
 * @returns {object}
 */
function getAdsDesMeta(adsDesSheet) {
  let metaData = {};
  metaData.fileName = valueElseUndefined(adsDesSheet.C2);
  metaData.date = valueElseUndefined(adsDesSheet.C3);
  metaData.time = valueElseUndefined(adsDesSheet.C4);
  metaData.comment1 = valueElseUndefined(adsDesSheet.C5);
  metaData.comment2 = valueElseUndefined(adsDesSheet.C6);
  metaData.comment3 = valueElseUndefined(adsDesSheet.C7);
  metaData.comment4 = valueElseUndefined(adsDesSheet.C8);
  metaData.serialNumber = valueElseUndefined(adsDesSheet.C9);
  metaData.version = valueElseUndefined(adsDesSheet.C10);
  metaData.sampleWeight = valueElseUndefinedFloat(adsDesSheet.C12);
  metaData.sampleWeightUnit = valueElseUndefinedStripunits(adsDesSheet.D12);
  metaData.standardVolume = valueElseUndefinedFloat(adsDesSheet.C13);
  metaData.standardVolumeUnit = valueElseUndefinedStripunits(adsDesSheet.D13);
  metaData.deadVolume = valueElseUndefinedFloat(adsDesSheet.C14);
  metaData.deadVolumeUnit = valueElseUndefinedStripunits(adsDesSheet.D14);
  metaData.equilibriumTime = valueElseUndefinedFloat(adsDesSheet.C15);
  metaData.equilibriumTimeUnit = valueElseUndefinedStripunits(adsDesSheet.D15);
  metaData.adsorptive = valueElseUndefined(adsDesSheet.C16);
  metaData.apparatusT = valueElseUndefined(adsDesSheet.C17);
  metaData.apparatusTUnit = valueElseUndefinedStripunits(adsDesSheet.D17);
  metaData.adsorptionT = valueElseUndefinedFloat(adsDesSheet.C18);
  metaData.adsorptionTUnit = valueElseUndefinedStripunits(adsDesSheet.D18);
  metaData.saturatedVaporPressure = valueElseUndefinedFloat(adsDesSheet.H12);
  metaData.saturatedVaporPressureUnit = valueElseUndefinedStripunits(
    adsDesSheet.I12,
  );
  metaData.adsorptionCrossSectionArea = valueElseUndefinedFloat(
    adsDesSheet.H13,
  );
  metaData.adsorptionCrossSectionAreaUnit = valueElseUndefinedStripunits(
    adsDesSheet.I13,
  );
  metaData.adsorptionPoints = valueElseUndefinedInt(adsDesSheet.H17);
  metaData.desorptionPoints = valueElseUndefinedInt(adsDesSheet.H18);
  return metaData;
}

/**
 * Parses the cells with actual isotherm data
 *
 * @param {object} worksheet sheetjs worksheet
 * @param {object} range sheetjs range
 * @returns
 */
function parseIsothermBlock(worksheet, range) {
  let data = {
    pi: [],
    pe: [],
    pe2: [],
    p0: [],
    pp0: [],
    va: [],
  };

  const adresses = [data.pi, data.pe, data.pe2, data.p0, data.pp0, data.va];

  for (let R = range.s.r; R <= range.e.r; ++R) {
    let counter = 0;
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cellAddress = { c: C, r: R };
      let cellRef = utils.encode_cell(cellAddress);
      adresses[counter].push(valueElseUndefinedFloat(worksheet[cellRef]));
      counter++;
    }
  }

  data.va = data.va.map((x) => {
    return (x / idealGasConstant) * 1000;
  });

  return data;
}

/**
 * Finds the cells with the isotherm data and calls the parser on them
 *
 * @param {object} worksheet sheetjs worksheet
 * @param {number} adsorptionPoints number of pressure points in the adsorption measurement
 * @param {number} desorptionPoints number of pressure points in the desorption measurement
 * @returns {object} with keys adsorption and desorption, values of which are arrays of floats
 */
function parseAdsDesData(worksheet, adsorptionPoints, desorptionPoints) {
  const rangeAds = {
    s: { c: 1, r: 22 },
    e: { c: 6, r: 22 + adsorptionPoints - 1 },
  };

  const rangeDes = {
    s: { c: 1, r: 22 + adsorptionPoints + 1 },
    e: { c: 6, r: 22 + adsorptionPoints + desorptionPoints },
  };

  const adsData = parseIsothermBlock(worksheet, rangeAds);
  const desData = parseIsothermBlock(worksheet, rangeDes);

  return {
    adsorption: adsData,
    desorption: desData,
  };
}

/**
 * Orchestrates the parsing of a Belsorp Excel (xls) file.
 *
 * @export
 * @param {Buffer} dataFile input excel file, e.g., read with readfilesync
 * @returns {Analysis}
 */
export function fromBelsorp(dataFile) {
  const workbook = read(dataFile);

  const adsDesSheet = workbook.Sheets.AdsDes;

  let metaData = getAdsDesMeta(adsDesSheet);

  let data = parseAdsDesData(
    adsDesSheet,
    metaData.adsorptionPoints,
    metaData.desorptionPoints,
  );

  const analysis = new Analysis();

  analysis.pushSpectrum(
    {
      x: {
        data: data.adsorption.pe,
        label: 'Pressure',
        isDependent: false,
        units: 'kPa',
      },
      y: {
        data: data.adsorption.va,
        label: 'Excess adsorption',
        isDependent: true,
        units: 'mmol/g',
      },
      p: {
        data: data.adsorption.pp0,
        label: 'relative pressure',
        isDependent: false,
        units: '',
      },
    },
    {
      dataType: 'Adsorption Isotherm',
      title: metaData.comment1,
      meta: metaData,
    },
  );

  analysis.pushSpectrum(
    {
      x: {
        data: data.desorption.pp0,
        label: 'relative pressure',
        isDependent: false,
        units: '',
      },
      y: {
        data: data.desorption.va,
        label: 'Excess adsorption',
        isDependent: true,
        units: 'mmol/g',
      },
      p: {
        data: data.desorption.pe,
        label: 'Pressure',
        isDependent: false,
        units: 'kPa',
      },
    },
    {
      dataType: 'Desorption Isotherm',
      title: metaData.comment1,
      meta: metaData,
    },
  );

  return analysis;
}

export const testables = {
  parseIsothermBlock,
  getAdsDesMeta,
  parseAdsDesData,
};
