import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import InputText from './index';

test('memakai gaya bawaan tanpa ikon', () => {
  const { getByPlaceholderText } = render(<InputText placeholder="email" />);
  const input = getByPlaceholderText('email');

  expect(input).toHaveAttribute('type', 'text');
  expect(input.className).toBe('outline-none flex-1 bg-transparent');
  expect(input.parentElement.className).toBe('inline-flex py-2 pl-5 pr-3 border rounded');
});

test('melebarkan dan membulatkan input sesuai prop', () => {
  const { getByPlaceholderText } = render(<InputText placeholder="cari" fitContainer fullRound />);

  expect(getByPlaceholderText('cari').parentElement.className).toBe(
    'flex py-2 pl-5 pr-3 border rounded-full'
  );
});

test('menyesuaikan padding saat ada ikon', () => {
  const { getByPlaceholderText } = render(
    <InputText placeholder="cari" iconBefore={<span>kiri</span>} />
  );

  expect(getByPlaceholderText('cari').parentElement.className).toBe(
    'inline-flex py-1 pl-1 pr-3 border rounded'
  );
});

test('memanggil onChange saat nilai berubah', () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <InputText placeholder="cari" value="" onChange={onChange} />
  );

  fireEvent.change(getByPlaceholderText('cari'), { target: { value: 'nasi' } });
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('meneruskan ref ke elemen input', () => {
  const ref = React.createRef();
  render(<InputText placeholder="email" ref={ref} />);

  expect(ref.current.tagName).toBe('INPUT');
});

test('meneruskan props tambahan seperti name ke elemen input', () => {
  const { getByPlaceholderText } = render(<InputText placeholder="email" name="email" />);
  expect(getByPlaceholderText('email')).toHaveAttribute('name', 'email');
});
