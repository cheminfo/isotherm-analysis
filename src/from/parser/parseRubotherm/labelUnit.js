/**
 * Separates the label and its unit
 * @param {string} label to separate
 * @returns {object} Object containing the unit and label
 */

export function labelUnit(label) {
  // eslint-disable-next-line prefer-named-capture-group
  const units = label.match(/(([a-z]+)([/])+|([(]))([a-zA-Z ()/]+)/);
  let unit = '';
  if (units) {
    unit = units[0];
  }
  let newLabel = label;
  if (unit !== '') {
    newLabel = newLabel.replace(unit, '');
  }
  newLabel = newLabel.replace(/ $/, '');
  return { label: newLabel, unit: unit };
}
