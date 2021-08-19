import { labelUnit } from '../labelUnit';

test('labelUnit', () => {
  expect(labelUnit('')).toStrictEqual({ label: '', unit: '' });
  expect(labelUnit('eadwadfasdawd  ')).toStrictEqual({
    label: 'eadwadfasdawd ',
    unit: '',
  });
  expect(labelUnit('Temperature (m/s)')).toStrictEqual({
    label: 'Temperature',
    unit: '(m/s)',
  });
  expect(labelUnit('Tempera ture m/s')).toStrictEqual({
    label: 'Tempera ture',
    unit: 'm/s',
  });
  expect(labelUnit('g/L')).toStrictEqual({ label: '', unit: 'g/L' });
  expect(labelUnit('Temperature (Rad) m/s')).toStrictEqual({
    label: 'Temperature',
    unit: '(Rad) m/s',
  });
});
