import React from 'react';
import { render } from '@testing-library/react';

import Responsive from './index';

test('menyusun class grid dan kolom sesuai breakpoint', () => {
  const { container } = render(
    <Responsive desktop={2} justify="between" items="center">
      <div>kiri</div>
      <div>kanan</div>
    </Responsive>
  );

  expect(container.firstChild.className).toBe(
    'md:flex flex-wrap lg:flex flex-wrap justify-between items-center'
  );
  expect(container.firstChild.children).toHaveLength(2);
  expect(container.firstChild.children[0].className).toBe('w-full md:w-1/2 lg:w-1/2');
});

test('tidak memberi class flex untuk breakpoint satu kolom', () => {
  const { container } = render(
    <Responsive desktop={1} tablet={1} mobile={1} items="">
      <div>satu</div>
    </Responsive>
  );

  expect(container.firstChild.className).toBe('');
});

test('membungkus anak tunggal dalam satu kolom', () => {
  const { container } = render(
    <Responsive desktop={3} items="stretch">
      <div>hanya satu</div>
    </Responsive>
  );

  expect(container.firstChild.children).toHaveLength(1);
  expect(container.firstChild.children[0].className).toBe('w-full md:w-1/2 lg:w-1/3');
});

test('tetap merender satu kolom kosong saat tidak ada anak', () => {
  const { container } = render(<Responsive desktop={3}>{[]}</Responsive>);

  expect(container.firstChild.children).toHaveLength(1);
  expect(container.firstChild.children[0].textContent).toBe('');
});

test('memakai lebar penuh untuk breakpoint di luar 2 sampai 6', () => {
  const { container } = render(
    <Responsive desktop={4} tablet={4} mobile={2}>
      <div>a</div>
      <div>b</div>
    </Responsive>
  );

  expect(container.firstChild.children[0].className).toBe('w-1/2 md:w-1/4 lg:w-1/4');
});
