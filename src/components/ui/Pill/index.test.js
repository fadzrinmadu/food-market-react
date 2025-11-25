import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Pill from './index';

test('memakai gaya tidak aktif sebagai bawaan', () => {
  const { getByRole } = render(<Pill text="ayam" icon="A" />);
  const pill = getByRole('button');

  expect(pill.className).toContain('bg-gray-200');
  expect(pill.className).toContain('text-gray-700');
  expect(pill).toHaveAttribute('aria-pressed', 'false');
});

test('memakai gaya aktif saat isActive', () => {
  const { getByRole, container } = render(<Pill text="ayam" icon="A" isActive />);
  const pill = getByRole('button');

  expect(pill.className).toContain('bg-red-600');
  expect(pill.className).toContain('text-white');
  expect(pill).toHaveAttribute('aria-pressed', 'true');
  expect(container.querySelector('.w-8').className).toContain('border-red-600');
});

test('bisa diklik dan diaktifkan lewat keyboard', () => {
  const onClick = jest.fn();
  const { getByRole } = render(<Pill text="ayam" icon="A" onClick={onClick} />);
  const pill = getByRole('button');

  expect(pill).toHaveAttribute('tabindex', '0');

  fireEvent.click(pill);
  fireEvent.keyDown(pill, { key: 'Enter' });
  fireEvent.keyDown(pill, { key: ' ' });
  fireEvent.keyDown(pill, { key: 'Escape' });

  expect(onClick).toHaveBeenCalledTimes(3);
});
