export function lineSplitTrim(line) {
  try {
    return lineSplit(line)[1].trim();
  } catch (e) {
    return '';
  }
}

export function lineSplit(line) {
  return line.split(/\s{4,}/);
}

export function lineSplitComma(line) {
  return line.split(',')[1];
}
