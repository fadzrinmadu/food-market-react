import React from 'react';
import { render } from '@testing-library/react';

import FormControl from './index';

test('merender label dan input di dalamnya', () => {
  const { getByText, getByPlaceholderText } = render(
    <FormControl label="Nama alamat" color="black">
      <input placeholder="Nama alamat" />
    </FormControl>
  );

  expect(getByText('Nama alamat').className).toBe('block font-bold mb-2 text-black');
  expect(getByPlaceholderText('Nama alamat')).toBeInTheDocument();
});

test('menyembunyikan area pesan error saat tidak ada error', () => {
  const { getByRole } = render(
    <FormControl>
      <input />
    </FormControl>
  );

  const alert = getByRole('alert', { hidden: true });
  expect(alert.className).toContain('invisible');
  expect(alert.className).toContain('h-8');
});

test('menampilkan pesan error saat ada error', () => {
  const { getByRole } = render(
    <FormControl errorMessage="Email wajib diisi">
      <input />
    </FormControl>
  );

  const alert = getByRole('alert');
  expect(alert.className).toContain('visible');
  expect(alert.textContent).toContain('Email wajib diisi');
});
