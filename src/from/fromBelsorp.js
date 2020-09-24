import { Analysis } from '..';

import { idealGasConstant } from './constants';

const {
  readFile,
  utils: { encode_cell },
} = require('xlsx');

function valueElseUndefined(cell) {
  return cell ? cell.v : undefined;
}

function valueElseUndefinedFloat(cell) {
  return cell ? parseFloat(cell.v) : undefined;
}

function valueElseUndefinedInt(cell) {
  return cell ? parseFloat(cell.v) : undefined;
}

function valueElseUndefinedStripUnit(cell) {
  let val = cell ? cell.v : undefined;
  return val.replace(']', '').replace('[', '');
}

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
  metaData.sampleWeightUnit = valueElseUndefinedStripUnit(adsDesSheet.D12);
  metaData.standardVolume = valueElseUndefinedFloat(adsDesSheet.C13);
  metaData.standardVolumeUnit = valueElseUndefinedStripUnit(adsDesSheet.D13);
  metaData.deadVolume = valueElseUndefinedFloat(adsDesSheet.C14);
  metaData.deadVolumeUnit = valueElseUndefinedStripUnit(adsDesSheet.D14);
  metaData.equilibriumTime = valueElseUndefinedFloat(adsDesSheet.C15);
  metaData.equilibriumTimeUnit = valueElseUndefinedStripUnit(adsDesSheet.D15);
  metaData.adsorptive = valueElseUndefined(adsDesSheet.C16);
  metaData.apparatusT = valueElseUndefined(adsDesSheet.C17);
  metaData.apparatusTUnit = valueElseUndefinedStripUnit(adsDesSheet.D17);
  metaData.adsorptionT = valueElseUndefinedFloat(adsDesSheet.C18);
  metaData.adsorptionTUnit = valueElseUndefinedStripUnit(adsDesSheet.D18);
  metaData.saturatedVaporPressure = valueElseUndefinedFloat(adsDesSheet.H12);
  metaData.saturatedVaporPressureUnit = valueElseUndefinedStripUnit(
    adsDesSheet.I12,
  );
  metaData.adsorptionCrossSectionArea = valueElseUndefinedFloat(
    adsDesSheet.H13,
  );
  metaData.adsorptionCrossSectionAreaUnit = valueElseUndefinedStripUnit(
    adsDesSheet.I13,
  );
  metaData.adsorptionPoints = valueElseUndefinedInt(adsDesSheet.H17);
  metaData.desorptionPoints = valueElseUndefinedInt(adsDesSheet.H18);
  return metaData;
}

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
      let cellRef = encode_cell(cellAddress);
      adresses[counter].push(valueElseUndefinedFloat(worksheet[cellRef]));
      counter++;
    }
  }

  data.va = data.va.map(function (x) {
    return (x / idealGasConstant) * 1000;
  });

  return data;
}

function parseAdsDesData(worksheet, adsorptionPoints, desorptionPoints) {
  // traverse the sheet
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

export function fromBelsorp(path) {
  const workbook = readFile(path);

  const adsDesSheet = workbook.Sheets.AdsDes;

  let metaData = getAdsDesMeta(adsDesSheet);

  let data = parseAdsDesData(
    adsDesSheet,
    metaData.adsorptionPoints,
    metaData.desorptionPoints,
  );

  let analysis = new Analysis();

  analysis.pushSpectrum(
    {
      x: {
        data: data.adsorption.pp0,
        label: 'relative pressure',
        type: 'independent',
      },
      p: {
        data: data.adsorption.pe,
        label: 'Pressure  [kPa]',
        type: 'independent',
      },
      y: {
        data: data.adsorption.va,
        label: 'Excess adsorption mmol /g',
        type: 'dependent',
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
      },
      p: {
        data: data.desorption.pe,
        label: 'Pressure  [kPa]',
      },
      y: {
        data: data.desorption.va,
        label: 'Excess adsorption mmol /g',
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
  parseIsothermBlock: parseIsothermBlock,
  getAdsDesMeta: getAdsDesMeta,
  parseAdsDesData: parseAdsDesData,
};
