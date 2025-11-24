import React from 'react';
import { render } from '@testing-library/react';

import LayoutSidebar from './index';

test('merender sidebar di kiri dengan lebar bawaan', () => {
  const { container, getByText } = render(
    <LayoutSidebar sidebar={<span>menu</span>} content={<span>isi</span>} />
  );

  expect(container.firstChild.className).toBe('flex flex-row w-full');
  expect(getByText('menu').parentElement.style.width).toBe('300px');
  expect(getByText('isi').parentElement.className).toBe('flex-1 overflow-hidden');
});

test('memakai lebar sidebar dari prop sidebarSize', () => {
  const { getByText } = render(
    <LayoutSidebar sidebar={<span>menu</span>} content={<span>isi</span>} sidebarSize={80} />
  );

  expect(getByText('menu').parentElement.style.width).toBe('80px');
});

test('membalik urutan saat sidebar berada di kanan', () => {
  const { container } = render(
    <LayoutSidebar sidebar={<span>menu</span>} content={<span>isi</span>} sidebarPosition="right" />
  );

  expect(container.firstChild.className).toBe('flex flex-row-reverse w-full');
});
