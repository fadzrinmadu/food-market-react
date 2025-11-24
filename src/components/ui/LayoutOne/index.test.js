import React from 'react';
import { render } from '@testing-library/react';

import LayoutOne from './index';

test('memakai ukuran large sebagai bawaan', () => {
  const { getByText } = render(<LayoutOne>konten</LayoutOne>);
  expect(getByText('konten').className).toBe('mx-auto px-2 sm:px-0 w-full md:w-4/5 max-w-4xl');
});

test('memakai lebar sesuai prop size', () => {
  const { getByText } = render(<LayoutOne size="small">konten</LayoutOne>);
  expect(getByText('konten').className).toBe('mx-auto px-2 sm:px-0 w-full md:w-1/3 max-w-sm');
});

test('tidak menambahkan class lebar untuk ukuran full', () => {
  const { getByText } = render(<LayoutOne size="full">konten</LayoutOne>);
  expect(getByText('konten').className).toBe('mx-auto px-2 sm:px-0');
});
