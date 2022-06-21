import { ensureString } from 'ensure-string';

const variableLabels = {
  No: 'Peak number',
  pi: 'Initial pressure', // kPa
  pe: 'Absolute pressure', // kPa
  p0: 'Relative pressure', // kPa
  'p/p0': 'p/p0',
  na: 'Amount of absorbed gas', // mol g^-1
  Va: 'Amount of absorbed gas', // ml g^-1
};

// p0 = saturation pressure
// p/p0 = relative pressure
// na = amount of adsorbed gas (N2 or CO2 for example)

/*
For adsorption we want:
- x: p/p0
- y: na or va
- p:

Adsorptive,N2
Adsorption temperature,77.000,[K]

For desorption we want
- x:
- y:
- p:


*/

export function parseBelsorpCSV(binary) {
  const text = ensureString(binary);
  const result = {};
  result.meta = {};

  const [header, data] = text.split(/\r?\n,*\r?\n/);
  appendMeta(header, result);
  appendData(data, result);

  return result;
}

function appendMeta(header, result) {
  for (let line of header.split(/\r?\n/)) {
    let comma = line.indexOf(',');
    if (comma > 0) {
      result.meta[line.substring(0, comma)] = line
        .substring(comma + 1)
        .replace(',[', ' [')
        .replace(/,+$/, '');
    }
  }
}

function appendData(data, result) {
  const lines = data.split(/\r?\n/);
  const variables = {};
  const variableNames = [];
  for (let field of lines[0].split(',')) {
    const parts = field === 'p/p0' ? [field] : field.split('/');
    const variable = {
      label: variableLabels[parts[0]] || parts[0],
      variable: parts[0],
      units: parts[1] ? parts[1].replace(' g^-1', '/g') : '',
      data: [],
    };
    variableNames.push(parts[0]);
    variables[parts[0]] = variable;
  }

  let target;
  for (let line of lines) {
    if (line.startsWith('ADS')) {
      target = JSON.parse(JSON.stringify(variables));
      result.adsorption = target;
    } else if (line.startsWith('DES')) {
      target = JSON.parse(JSON.stringify(variables));
      result.desorption = target;
    }
    if (target) {
      if (line.match(/^[0-9E,.-]*$/)) {
        const fields = line.split(',').map((field) => Number(field));
        for (let i = 0; i < variableNames.length; i++) {
          if (variableNames[i]) {
            target[variableNames[i]].data.push(fields[i]);
          }
        }
      }
    }
  }
}
