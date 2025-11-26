import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CardProduct from './index';

test('merender judul, gambar, dan harga produk', () => {
  const { getByText, getByAltText } = render(
    <CardProduct title="Nasi goreng" imgUrl="/nasi.png" price={25000} />
  );

  expect(getByText('Nasi goreng').tagName).toBe('H5');
  expect(getByAltText('Nasi goreng')).toHaveAttribute('src', '/nasi.png');
  expect(getByText(/25\.0?00/)).toBeInTheDocument();
});

test('memformat harga dengan tiga digit signifikan seperti sebelumnya', () => {
  const { getByText } = render(<CardProduct title="Kopi" imgUrl="/kopi.png" price={12345} />);

  expect(getByText(content => content.replace(/\s/g, ' ').includes('12.300'))).toBeInTheDocument();
});

test('tombol tambah ke keranjang punya nama terbaca dan bisa diklik', () => {
  const onAddToCart = jest.fn();
  const { getByLabelText } = render(
    <CardProduct title="Nasi goreng" imgUrl="/nasi.png" price={25000} onAddToCart={onAddToCart} />
  );

  const button = getByLabelText('Tambah Nasi goreng ke keranjang');

  fireEvent.click(button);
  fireEvent.keyDown(button, { key: 'Enter' });

  expect(onAddToCart).toHaveBeenCalledTimes(2);
});

test('menjaga slot kosong agar gambar tetap rata kanan', () => {
  const { container } = render(<CardProduct title="Kopi" imgUrl="/kopi.png" price={1000} />);
  const body = container.querySelector('.flex.justify-between');

  expect(body.children).toHaveLength(2);
  expect(body.children[0].textContent).toBe('');
});
