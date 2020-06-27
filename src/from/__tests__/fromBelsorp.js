import { join } from 'path';

import { fromBelsorp, testables } from '../fromBelsorp';

const {
  getLineNumbersOfMeasurement,
  parseIGAMeasurmentHeader,
  parseIGADataBlock,
  parseOneIGA,
} = testables;

test('fromBelsorp', () => {
  const rest = fromBelsorp(join(__dirname, '../../../testFiles/BET.xls'));
  console.log(rest);
});
