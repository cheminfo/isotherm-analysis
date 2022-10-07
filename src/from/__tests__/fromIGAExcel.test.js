import { readFileSync } from 'fs';
import { join } from 'path';

import { readFile } from 'xlsx';

import { fromIGAExcel } from '../fromIGAExcel';

test('fromIGAExcel', () => {
  const workbook = readFileSync(
    join(__dirname, '../../../testFiles/IGAExcel.xlsx'),
  );
  const res = fromIGAExcel(workbook);
});
