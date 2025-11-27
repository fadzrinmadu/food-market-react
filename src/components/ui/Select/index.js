import * as React from 'react';
import { arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';
import ReactSelect from 'react-select';

/**
 * Select.
 *
 * Komponen ini membungkus `react-select` — sama seperti komponen `Select` milik
 * `upkit` sebelumnya, yang juga hanya pembungkus tipis. `react-select` dipakai
 * langsung agar perilaku pencarian, navigasi keyboard, dan aksesibilitas
 * combobox tetap persis sama.
 */
export default function Select({ options, onChange, value, isMulti, ...props }) {
  return (
    <ReactSelect
      options={options}
      onChange={onChange}
      value={value}
      isMulti={isMulti}
      {...props}
    />
  );
}

Select.propTypes = {
  /** daftar opsi yang bisa dipilih */
  options: arrayOf(
    shape({
      label: string,
      value: oneOfType([string, number]),
    })
  ),
  /** dipanggil dengan opsi yang dipilih */
  onChange: func,
  /** opsi yang sedang terpilih */
  value: oneOfType([
    shape({ label: string, value: oneOfType([string, number]) }),
    arrayOf(shape({ label: string, value: oneOfType([string, number]) })),
  ]),
  /** izinkan memilih lebih dari satu opsi */
  isMulti: bool,
};
