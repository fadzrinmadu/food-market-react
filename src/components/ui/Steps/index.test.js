import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Steps from './index';

const steps = [
  { label: 'Item', icon: <span>1</span> },
  { label: 'Alamat', icon: <span>2</span> },
  { label: 'Konfirmasi', icon: <span>3</span> },
];

test('merender semua langkah dengan pemisah di antaranya', () => {
  const { container, getByText } = render(<Steps steps={steps} active={0} />);

  expect(getByText('Item')).toBeInTheDocument();
  expect(getByText('Konfirmasi')).toBeInTheDocument();
  expect(container.querySelectorAll('.bg-red-600.h-1')).toHaveLength(2);
});

test('menandai langkah aktif', () => {
  const { getByText } = render(<Steps steps={steps} active={1} />);
  const activeStep = getByText('Alamat').parentElement;

  expect(activeStep.className).toContain('bg-red-600 text-white font-bold');
  expect(activeStep).toHaveAttribute('aria-current', 'step');
});

test('tidak interaktif jika onChange tidak diberikan', () => {
  const { queryAllByRole } = render(<Steps steps={steps} active={0} />);
  expect(queryAllByRole('button')).toHaveLength(0);
});

test('memanggil onChange lewat klik dan keyboard saat interaktif', () => {
  const onChange = jest.fn();
  const { getByText } = render(<Steps steps={steps} active={0} onChange={onChange} />);
  const secondStep = getByText('Alamat').parentElement;

  expect(secondStep).toHaveAttribute('role', 'button');

  fireEvent.click(secondStep);
  fireEvent.keyDown(secondStep, { key: 'Enter' });

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenCalledWith(1);
});
