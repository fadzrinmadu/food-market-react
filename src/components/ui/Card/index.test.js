import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Card from './index';

test('merender header, body, dan footer', () => {
  const { getByText } = render(
    <Card header={<span>judul</span>} body={<span>isi</span>} footer={<span>kaki</span>} />
  );

  expect(getByText('judul')).toBeInTheDocument();
  expect(getByText('isi')).toBeInTheDocument();
  expect(getByText('kaki')).toBeInTheDocument();
});

test('memakai children jika body tidak diberikan', () => {
  const { getByText } = render(<Card>isi dari children</Card>);
  expect(getByText('isi dari children')).toBeInTheDocument();
});

test('memakai border abu-abu untuk kartu putih', () => {
  const { container } = render(<Card color="white">putih</Card>);
  const card = container.querySelector('.w-full > div');

  expect(card.className).toBe('bg-white shadow-lg rounded-lg p-4 border border-gray-100');
});

test('memakai warna merah dan border putih sebagai bawaan', () => {
  const { container } = render(<Card>merah</Card>);
  const card = container.querySelector('.w-full > div');

  expect(card.className).toBe('bg-red-600 shadow-lg rounded-lg p-4 border border-white');
});

test('tidak menjadi elemen interaktif jika tanpa onClick', () => {
  const { container } = render(<Card>statis</Card>);
  const card = container.querySelector('.w-full > div');

  expect(card).not.toHaveAttribute('role');
  expect(card).not.toHaveAttribute('tabindex');
});

test('bisa diklik dan diaktifkan lewat keyboard saat ada onClick', () => {
  const onClick = jest.fn();
  const { getByRole } = render(<Card onClick={onClick}>klik</Card>);
  const card = getByRole('button');

  expect(card.className).toContain('cursor-pointer');
  expect(card).toHaveAttribute('tabindex', '0');

  fireEvent.click(card);
  fireEvent.keyDown(card, { key: 'Enter' });
  fireEvent.keyDown(card, { key: ' ' });
  fireEvent.keyDown(card, { key: 'a' });

  expect(onClick).toHaveBeenCalledTimes(3);
});
