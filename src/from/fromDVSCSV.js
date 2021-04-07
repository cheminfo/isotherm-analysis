import Papa from 'papaparse';

import { lineSplitComma } from './utils';

function parseMeta(lines) {
  let meta = {};
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match('Method Name:')) {
      meta.methodName = lineSplitComma(lines[i]);
    }
    if (lines[i].match('Method Created:')) {
      meta.methodCreated = lineSplitComma(lines[i]);
    }
    if (lines[i].match('Sample Name:')) {
      meta.sampleName = lineSplitComma(lines[i]);
    }
    if (lines[i].match('Sample Description:')) {
      meta.sampleDescription = lineSplitComma(lines[i]);
    }
    if (lines[i].match('Initial Mass')) {
      meta.sampleWeight = parseFloat(lineSplitComma(lines[i]));
      meta.sampleWeightUnit = 'mg';
    }
    if (lines[i].match('User Name:')) {
      meta.user = lineSplitComma(lines[i]);
    }
    if (lines[i].match('Data Saving Interval [seconds]:')) {
      meta.dataSavingInterval = parseFloat(lineSplitComma(lines[i]));
      meta.dataSavingIntervalUnit = 's';
    }
    if (lines[i].match('Vapour Pressure')) {
      //ToDo: Maybe convert directly to kPa
      meta.vapourPressure = parseFloat(lineSplitComma(lines[i]));
      meta.vapourPressureUnit = 'Torr';
    }
    if (lines[i].match('File Version:')) {
      meta.fileVersion = lineSplitComma(lines[i]);
    }
    if (lines[i].match('Ref. Mass')) {
      meta.referenceMass = parseFloat(lineSplitComma(lines[i]));
    }
    if (lines[i].match('Data Points')) {
      meta.dataPoints = parseInt(lineSplitComma(lines[i]), 10);
    }

    if (lines[i].match('Vapour:')) {
      meta.adsorptive = lineSplitComma(lines[i]).split(' ')[0];
    }
    if (lines[i].match('Data Start Row')) {
      meta.dataStartRow = parseInt(lineSplitComma(lines[i]), 10);
    }

    if (lines[i].match('First Dry Row')) {
      meta.firstDryRow = parseInt(lineSplitComma(lines[i]), 10);
    }

    if (lines[i].match('Data Saving Interval')) {
      meta.dataSavingInterval = parseInt(lineSplitComma(lines[i]), 10);
      meta.dataSavingIntervalUnit = 's';
    }

    if (lines[i].match('First Dry Row')) {
      meta.firstDryRow = parseInt(lineSplitComma(lines[i]), 10);
    }

    if (lines[i].match('First Post Dry Row')) {
      meta.firstPostDryRow = parseInt(lineSplitComma(lines[i]), 10);
    }

    if (lines[i].match('Counterweight')) {
      meta.counterWeight = parseFloat(lineSplitComma(lines[i]));
      meta.counterWeightUnit = 'mg';
    }

    if (lines[i].match('Auxiliary Probe Used:')) {
      meta.auxiliaryProbeUsed = lineSplitComma(lines[i]);
    }

    if (lines[i].match('Chiller Used:')) {
      meta.chillerUsed = lineSplitComma(lines[i]);
    }

    if (lines[i].match('Slave Preheater Used:')) {
      meta.slavePreheaterUsed = lineSplitComma(lines[i]);
    }

    if (lines[i].match('Time [minutes]')) {
      break;
    }
  }

  return meta;
}

// function findAdsDesSwitches(targetPressure) {
//   // The file might contain adsorption/desorption cycles, we find this by checking when the target pressure switches
// }

function parseData(lines, dataStartRow) {
  // ToDo: somehow ugly to first split and then join again
  let text = lines.slice(dataStartRow - 1, lines.length).join('\r\n');
  let parsed = Papa.parse(text, {
    delimiter: ',',
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;

  let data = {};
  const arrayColumn = (arr, n) => arr.map((x) => x[n]);
  data.time = arrayColumn(parsed, 0);
  data.RH = arrayColumn(parsed, 26);
  data.targetRH = arrayColumn(parsed, 25);
  data.targetp = arrayColumn(parsed, 9).map(function (item) {
    return item * 0.133322; // Torr to kPa
  });
  data.x = arrayColumn(parsed, 10).map(function (item) {
    return item * 0.133322; // Torr to kPa
  });
  data.p = arrayColumn(parsed, 9).map(function (item) {
    return item / 100;
  });

  return data;
}

export const testables = {
  parseMeta: parseMeta,
  parseData: parseData,
};
