import { join } from 'path';

import { fromBelsorp } from '../fromBelsorp';

test('fromBelsorp', () => {
  const rest = fromBelsorp(join(__dirname, '../../../testFiles/BET.xls'));
  console.log(rest);
});
