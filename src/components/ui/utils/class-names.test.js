import { classNames } from './class-names';

test('menggabungkan class dan mengabaikan nilai kosong', () => {
  expect(classNames('p-2', 'rounded')).toBe('p-2 rounded');
  expect(classNames('p-2', false && 'hidden', null, undefined, '')).toBe('p-2');
  expect(classNames()).toBe('');
});
