import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CardItem from './index';

test('merender nama, gambar, dan jumlah item', () => {
  const { getByText, getByAltText, container } = render(
    <CardItem name="Nasi goreng" imgUrl="/nasi.png" qty={2} color="orange" />
  );

  expect(getByText('Nasi goreng')).toBeInTheDocument();
  expect(getByAltText('Nasi goreng')).toHaveAttribute('src', '/nasi.png');
  expect(container.querySelector('input').value).toBe('2');
});

test('memakai warna kartu sesuai prop color', () => {
  const { container } = render(
    <CardItem name="Nasi goreng" imgUrl="/nasi.png" qty={1} color="orange" />
  );

  expect(container.firstChild.className).toBe('bg-orange-400 text-orange-900 flex p-2 rounded');
});

test('meneruskan tombol tambah dan kurang', () => {
  const onInc = jest.fn();
  const onDec = jest.fn();
  const { getByLabelText } = render(
    <CardItem name="Nasi goreng" imgUrl="/nasi.png" qty={1} onInc={onInc} onDec={onDec} />
  );

  fireEvent.click(getByLabelText('Tambah jumlah'));
  fireEvent.click(getByLabelText('Kurangi jumlah'));

  expect(onInc).toHaveBeenCalledTimes(1);
  expect(onDec).toHaveBeenCalledTimes(1);
});
