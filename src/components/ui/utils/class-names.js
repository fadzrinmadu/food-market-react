/**
 * Gabungkan beberapa nama class menjadi satu string, abaikan nilai kosong.
 *
 * Contoh: classNames('p-2', isActive && 'bg-red-600') // => 'p-2 bg-red-600'
 */
export function classNames(...args) {
  return args.filter(Boolean).join(' ');
}
