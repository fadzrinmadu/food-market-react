import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import InputNumber from './index';

test('memakai gaya bawaan berukuran medium', () => {
  const { container } = render(<InputNumber value={1} />);

  expect(container.firstChild.className).toBe('border inline-flex rounded py-1 px-2');
  expect(container.querySelector('input').className).toBe(
    'px-2 w-16 rounded text-center bg-transparent'
  );
});

test('memakai lebar input yang lebih kecil untuk ukuran small', () => {
  const { container } = render(<InputNumber value={2} size="small" />);
  expect(container.querySelector('input').className).toContain('w-8');
});

test('tombol tambah dan kurang punya nama yang terbaca dan memanggil handler', () => {
  const onInc = jest.fn();
  const onDec = jest.fn();
  const { getByLabelText } = render(<InputNumber value={1} onInc={onInc} onDec={onDec} />);

  fireEvent.click(getByLabelText('Tambah jumlah'));
  fireEvent.click(getByLabelText('Kurangi jumlah'));

  expect(onInc).toHaveBeenCalledTimes(1);
  expect(onDec).toHaveBeenCalledTimes(1);
});

test('mengirim nilai angka saat diketik langsung', () => {
  const onSetValue = jest.fn();
  const { container } = render(<InputNumber value={1} onSetValue={onSetValue} />);

  fireEvent.change(container.querySelector('input'), { target: { value: '5' } });
  expect(onSetValue).toHaveBeenCalledWith(5);
});

test('tidak error saat diketik walau onSetValue tidak diberikan', () => {
  const { container } = render(<InputNumber value={1} />);

  expect(() =>
    fireEvent.change(container.querySelector('input'), { target: { value: '5' } })
  ).not.toThrow();
});
