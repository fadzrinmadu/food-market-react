import React from 'react';
import { render } from '@testing-library/react';

import Badge from './index';

test('memakai warna sesuai prop color', () => {
  const { getByText } = render(<Badge color="orange">Menunggu pembayaran</Badge>);
  const el = getByText('Menunggu pembayaran');

  expect(el.className).toContain('bg-orange-200');
  expect(el.className).toContain('text-orange-900');
});

test('memakai warna merah sebagai bawaan', () => {
  const { getByText } = render(<Badge>status</Badge>);
  const el = getByText('status');

  expect(el.className).toBe(
    'bg-red-200 text-red-900 inline-flex justify-center items-center px-1 text-sm rounded'
  );
});
