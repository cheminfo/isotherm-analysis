import { readFileSync } from 'fs';
import { join } from 'path';

import { testables } from '../fromMicrometricsTXT';

const { findDataBlocks } = testables;

test('fromMicrometricsTXT', () => {
  const file = readFileSync(
    join(__dirname, '../../../testFiles/GVM-BET-Gemini.VII.2390.v1.03.TXT'),
    'utf16le',
  );

  const lines = file.split(/\r?\n/).filter((line) => !line.match(/^\s*$/));
  let startsAndEnds = findDataBlocks(lines);
  expect(startsAndEnds).toHaveLength(2);
  expect(startsAndEnds[0]).toStrictEqual([35]);
  expect(startsAndEnds[1]).toStrictEqual([70]);
});
