/**
 * Daftar warna yang bisa dipakai komponen UI internal.
 *
 * Nilainya mengikuti palet Tailwind di `tailwind.config.js`, ditambah `white`
 * dan `black` yang tidak punya tingkatan accent.
 */
export const colors = [
  'red',
  'yellow',
  'gray',
  'purple',
  'indigo',
  'orange',
  'green',
  'blue',
  'white',
  'black',
];

function withAccent(prefix, color, accent) {
  if (['white', 'black'].includes(color)) return `${prefix}-${color}`;
  return `${prefix}-${color}-${accent}`;
}

/** Nama class Tailwind untuk warna background. */
export function getBgColor(color = 'red', accent = 600) {
  return withAccent('bg', color, accent);
}

/** Nama class Tailwind untuk warna background saat hover. */
export function getBgColorHover(color = 'red', accent = 700) {
  return withAccent('hover:bg', color, accent);
}

/** Nama class Tailwind untuk warna teks. */
export function getTextColor(color = 'red', accent = 600) {
  return withAccent('text', color, accent);
}

/** Nama class Tailwind untuk warna teks saat hover. */
export function getTextColorHover(color = 'red', accent = 700) {
  return withAccent('hover:text', color, accent);
}

/** Nama class Tailwind untuk warna border. */
export function getBorderColor(color = 'red', accent = 600) {
  return withAccent('border', color, accent);
}
