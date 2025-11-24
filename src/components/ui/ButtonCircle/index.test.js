import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ButtonCircle from './index';

test('memakai gaya bawaan berukuran medium', () => {
  const { getByRole } = render(<ButtonCircle icon="+" />);
  const button = getByRole('button');

  expect(button.className).toBe(
    'w-8 h-8 bg-red-600 hover:bg-red-700 text-white inline-flex items-center justify-center rounded-full shadow-lg border-2 leading-none border-white'
  );
  expect(button).not.toHaveAttribute('style');
});

test('memakai ukuran tetap dalam rem untuk ukuran small', () => {
  const { getByRole } = render(<ButtonCircle icon="-" size="small" />);
  const button = getByRole('button');

  expect(button.className).toContain('w-6 h-6');
  expect(button.style.width).toBe('1.7rem');
  expect(button.style.height).toBe('1.7rem');
});

test('meneruskan warna tombol dan warna isi', () => {
  const { getByRole } = render(<ButtonCircle icon="+" color="gray" textColor="black" />);
  const button = getByRole('button');

  expect(button.className).toContain('bg-gray-600');
  expect(button.className).toContain('text-black');
});

test('memanggil onClick saat diklik', () => {
  const onClick = jest.fn();
  const { getByRole } = render(<ButtonCircle icon="+" onClick={onClick} />);

  fireEvent.click(getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('meneruskan props tambahan ke elemen button', () => {
  const { getByLabelText } = render(<ButtonCircle icon="+" aria-label="tambah" />);
  expect(getByLabelText('tambah')).toBeInTheDocument();
});
