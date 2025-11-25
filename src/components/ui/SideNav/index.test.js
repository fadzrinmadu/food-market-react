import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SideNav from './index';

const items = [
  { icon: '/images/menus/semua.png', label: 'semua', id: '' },
  { icon: '/images/menus/utama.png', label: 'utama', id: 'utama' },
];

test('memakai warna merah dan perataan bawaan', () => {
  const { container } = render(<SideNav items={items} />);

  expect(container.firstChild.className).toBe(
    'bg-red-600 h-full min-h-screen justify-start md:justify-center w-20 py-5 items-stretch flex flex-col'
  );
});

test('memakai perataan atas saat verticalAlign top', () => {
  const { container } = render(<SideNav items={items} verticalAlign="top" />);
  expect(container.firstChild.className).toContain('md:justify-start');
});

test('menandai menu yang aktif', () => {
  const { getByText } = render(<SideNav items={items} active="utama" />);

  expect(getByText('utama').className).toContain('bg-red-700');
  expect(getByText('utama')).toHaveAttribute('aria-current', 'page');
  expect(getByText('semua').className).not.toContain('bg-red-700');
});

test('mengirim id menu saat diklik atau ditekan keyboard', () => {
  const onChange = jest.fn();
  const { getByText } = render(<SideNav items={items} active="" onChange={onChange} />);

  fireEvent.click(getByText('utama'));
  fireEvent.keyDown(getByText('utama'), { key: 'Enter' });

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenCalledWith('utama');
});

test('merender ikon string sebagai gambar dekoratif', () => {
  const { container } = render(<SideNav items={items} />);
  const img = container.querySelector('img');

  expect(img).toHaveAttribute('src', '/images/menus/semua.png');
  expect(img).toHaveAttribute('alt', '');
});

test('merender ikon berupa elemen di dalam pembungkus', () => {
  const { container } = render(<SideNav items={[{ icon: <span>ikon</span>, label: 'kustom', id: 'k' }]} />);

  expect(container.querySelector('.text-4xl').textContent).toBe('ikon');
});
