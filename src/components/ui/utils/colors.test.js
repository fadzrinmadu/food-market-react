import { getBgColor, getBgColorHover, getTextColor, getTextColorHover, getBorderColor } from './colors';

test('menyusun class warna dengan accent', () => {
  expect(getBgColor('orange', 200)).toBe('bg-orange-200');
  expect(getTextColor('orange', 900)).toBe('text-orange-900');
  expect(getBorderColor('red', 600)).toBe('border-red-600');
  expect(getBgColorHover('red')).toBe('hover:bg-red-700');
  expect(getTextColorHover('red')).toBe('hover:text-red-700');
});

test('warna white dan black tidak memakai accent', () => {
  expect(getBgColor('white')).toBe('bg-white');
  expect(getTextColor('black', 900)).toBe('text-black');
  expect(getBgColorHover('white', 700)).toBe('hover:bg-white');
});

test('memakai nilai bawaan jika argumen tidak diberikan', () => {
  expect(getBgColor()).toBe('bg-red-600');
  expect(getTextColor()).toBe('text-red-600');
});
