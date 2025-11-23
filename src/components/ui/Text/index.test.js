import React from 'react';
import { render } from '@testing-library/react';

import Text from './index';

test('memakai varian body dan warna hitam sebagai bawaan', () => {
  const { getByText } = render(<Text>halo</Text>);
  expect(getByText('halo').className).toBe('text-black');
});

test('merender heading semantik untuk varian h1 sampai h6', () => {
  const { getByText } = render(<Text as="h3">judul</Text>);
  const el = getByText('judul');
  expect(el.tagName).toBe('H3');
  expect(el.className).toBe('text-3xl text-black');
});

test('merender div untuk varian non heading', () => {
  const { getByText } = render(<Text as="small" color="white">kecil</Text>);
  const el = getByText('kecil');
  expect(el.tagName).toBe('DIV');
  expect(el.className).toBe('text-sm text-white');
});

test('menambahkan class tebal saat bold', () => {
  const { getByText } = render(<Text bold>tebal</Text>);
  expect(getByText('tebal').className).toBe('text-black font-bold');
});
