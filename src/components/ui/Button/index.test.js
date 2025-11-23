import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from './index';

test('merender label dari prop text maupun children', () => {
  const { getByText } = render(<Button text="Checkout" />);
  expect(getByText('Checkout')).toBeInTheDocument();

  const { getByText: getByText2 } = render(<Button>Simpan</Button>);
  expect(getByText2('Simpan')).toBeInTheDocument();
});

test('memakai warna dan ukuran bawaan', () => {
  const { getByRole } = render(<Button>Kirim</Button>);
  const button = getByRole('button');

  expect(button.className).toBe(
    'h-8 bg-red-600 hover:bg-red-700 inline-flex items-center justify-center px-4 text-white rounded shadow-lg border border-white'
  );
});

test('memakai gaya disabled dan tidak bisa diklik saat disabled', () => {
  const onClick = jest.fn();
  const { getByRole } = render(
    <Button disabled onClick={onClick}>
      Bayar
    </Button>
  );
  const button = getByRole('button');

  expect(button).toBeDisabled();
  expect(button.className).toContain('cursor-not-allowed');
  expect(button.className).toContain('bg-red-300');

  fireEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});

test('memanggil onClick saat diklik', () => {
  const onClick = jest.fn();
  const { getByRole } = render(<Button onClick={onClick}>Lanjut</Button>);

  fireEvent.click(getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('tidak memaksa type sehingga tetap bisa men-submit form', () => {
  const onSubmit = jest.fn(event => event.preventDefault());
  const { getByRole } = render(
    <form onSubmit={onSubmit}>
      <Button>Login</Button>
    </form>
  );

  fireEvent.click(getByRole('button'));
  expect(onSubmit).toHaveBeenCalledTimes(1);
});

test('melebarkan tombol saat fitContainer', () => {
  const { getByRole } = render(<Button fitContainer>Login</Button>);
  expect(getByRole('button').className).toContain('w-full');
});

test('merender ikon sebelum dan sesudah label', () => {
  const { container } = render(
    <Button iconBefore={<span>kiri</span>} iconAfter={<span>kanan</span>}>
      Lanjut
    </Button>
  );

  expect(container.querySelector('.mr-2').textContent).toBe('kiri');
  expect(container.querySelector('.ml-2').textContent).toBe('kanan');
});
