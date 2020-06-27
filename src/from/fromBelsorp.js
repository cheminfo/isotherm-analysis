import { Analysis } from '..';

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

function parseAdsDesData(worksheet, adsorptionPoints, desorptionPoints) {}

export function fromBelsorp(path) {
  let excelworkbook = require('xlsx');

  const workbook = excelworkbook.readFile(path);
  console.log(workbook.SheetNames[0]);

  const adsDesSheet = workbook.Sheets.AdsDes;

  let metaData = getAdsDesMeta(adsDesSheet);
  console.log(metaData);
  return adsDesSheet;
}
