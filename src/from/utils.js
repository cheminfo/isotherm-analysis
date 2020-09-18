export function lineSplitTrim(line) {
  return lineSplit(line)[1].trim();
}

export function lineSplit(line) {
  return line.split(/\s{4,}/);
}
