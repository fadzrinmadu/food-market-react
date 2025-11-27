import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Select from './index';

const options = [
  { label: 'Jawa Barat', value: '32' },
  { label: 'Jawa Tengah', value: '33' },
];

test('menampilkan opsi yang sedang terpilih', () => {
  const { getByText } = render(<Select options={options} value={options[1]} />);
  expect(getByText('Jawa Tengah')).toBeInTheDocument();
});

test('membuka daftar opsi dan mengirim opsi yang dipilih', () => {
  const onChange = jest.fn();
  const { container, getByText } = render(<Select options={options} onChange={onChange} />);

  fireEvent.keyDown(container.querySelector('input'), { key: 'ArrowDown', keyCode: 40 });
  expect(getByText('Jawa Barat')).toBeInTheDocument();

  fireEvent.click(getByText('Jawa Barat'));
  expect(onChange).toHaveBeenCalledWith(options[0], expect.anything());
});

test('meneruskan status nonaktif ke input', () => {
  const { container } = render(<Select options={options} isDisabled />);
  expect(container.querySelector('input')).toBeDisabled();
});
