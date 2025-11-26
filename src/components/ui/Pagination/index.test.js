import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Pagination from './index';

test('merender seluruh nomor halaman saat halaman kurang dari enam', () => {
  const { getByLabelText, queryByLabelText } = render(
    <Pagination totalItems={45} perPage={10} page={1} />
  );

  expect(getByLabelText('Halaman 1')).toBeInTheDocument();
  expect(getByLabelText('Halaman 5')).toBeInTheDocument();
  expect(queryByLabelText('Halaman 6')).not.toBeInTheDocument();
});

test('menandai halaman aktif', () => {
  const { getByLabelText } = render(<Pagination totalItems={45} perPage={10} page={3} />);
  const active = getByLabelText('Halaman 3');

  expect(active).toHaveAttribute('aria-current', 'page');
  expect(active.className).toContain('bg-red-600');
});

test('menonaktifkan panah kiri di halaman pertama', () => {
  const { getByLabelText } = render(<Pagination totalItems={45} perPage={10} page={1} />);

  expect(getByLabelText('Halaman sebelumnya')).toHaveAttribute('aria-disabled', 'true');
  expect(getByLabelText('Halaman berikutnya')).not.toHaveAttribute('aria-disabled');
});

test('menonaktifkan panah kanan di halaman terakhir', () => {
  const { getByLabelText } = render(<Pagination totalItems={45} perPage={10} page={5} />);

  expect(getByLabelText('Halaman berikutnya')).toHaveAttribute('aria-disabled', 'true');
  expect(getByLabelText('Halaman sebelumnya')).not.toHaveAttribute('aria-disabled');
});

test('tidak memanggil handler saat tombol dinonaktifkan', () => {
  const onPrev = jest.fn();
  const { getByLabelText } = render(
    <Pagination totalItems={45} perPage={10} page={1} onPrev={onPrev} />
  );

  fireEvent.click(getByLabelText('Halaman sebelumnya'));
  expect(onPrev).not.toHaveBeenCalled();
});

test('memanggil onChange, onPrev, dan onNext', () => {
  const onChange = jest.fn();
  const onPrev = jest.fn();
  const onNext = jest.fn();
  const { getByLabelText, getByText } = render(
    <Pagination
      totalItems={45}
      perPage={10}
      page={3}
      onChange={onChange}
      onPrev={onPrev}
      onNext={onNext}
    />
  );

  fireEvent.click(getByLabelText('Halaman 2'));
  expect(onChange).toHaveBeenCalledWith(2);

  fireEvent.click(getByLabelText('Halaman sebelumnya'));
  expect(onPrev).toHaveBeenCalledTimes(1);

  fireEvent.click(getByLabelText('Halaman berikutnya'));
  expect(onNext).toHaveBeenCalledTimes(1);

  fireEvent.click(getByText('First'));
  expect(onChange).toHaveBeenCalledWith(1);

  fireEvent.click(getByText('Last'));
  expect(onChange).toHaveBeenCalledWith(5);
});

test('memotong daftar nomor halaman saat halaman lebih dari lima', () => {
  const { getByLabelText, queryByLabelText } = render(
    <Pagination totalItems={100} perPage={10} page={5} />
  );

  expect(queryByLabelText('Halaman 1')).not.toBeInTheDocument();
  expect(getByLabelText('Halaman 3')).toBeInTheDocument();
  expect(getByLabelText('Halaman 6')).toBeInTheDocument();
  expect(queryByLabelText('Halaman 8')).not.toBeInTheDocument();
});

test('bisa dioperasikan lewat keyboard', () => {
  const onChange = jest.fn();
  const { getByLabelText } = render(
    <Pagination totalItems={45} perPage={10} page={1} onChange={onChange} />
  );

  fireEvent.keyDown(getByLabelText('Halaman 2'), { key: 'Enter' });
  expect(onChange).toHaveBeenCalledWith(2);
});
