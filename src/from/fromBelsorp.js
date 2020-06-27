import { Analysis } from '..';

function getAdsDesMeta(adsDesSheet) {
  let metaData = {};
}

export function fromBelsorp(path) {
  let excelworkbook = require('xlsx');

  const workbook = excelworkbook.readFile(path);
  console.log(workbook.SheetNames[0]);

  const adsDesSheet = workbook.Sheets['AdsDes'];

  return adsDesSheet;
}
