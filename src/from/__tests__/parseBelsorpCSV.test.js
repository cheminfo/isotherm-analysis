import { readFileSync } from 'fs';
import { join } from 'path';

import { parseBelsorpCSV } from '../parseBelsorpCSV';

test('parseBelsorpCSV', () => {
  const binary = readFileSync(join(__dirname, 'data/belsorp.csv'));

  const parsed = parseBelsorpCSV(binary);

  expect(Object.keys(parsed)).toStrictEqual([
    'meta',
    'adsorption',
    'desorption',
  ]);
  expect(parsed).toMatchSnapshot();
});
