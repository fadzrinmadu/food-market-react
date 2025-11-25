import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Textarea from './index';

test('memakai gaya dan jumlah baris bawaan', () => {
  const { getByPlaceholderText } = render(<Textarea placeholder="Detail alamat" />);
  const textarea = getByPlaceholderText('Detail alamat');

  expect(textarea.className).toBe('border px-5 py-2 rounded');
  expect(textarea).toHaveAttribute('rows', '4');
});

test('melebarkan textarea saat fitContainer', () => {
  const { getByPlaceholderText } = render(<Textarea placeholder="Detail alamat" fitContainer />);
  expect(getByPlaceholderText('Detail alamat').className).toBe('border px-5 py-2 rounded w-full');
});

test('memanggil onChange saat nilai berubah', () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <Textarea placeholder="Detail alamat" value="" onChange={onChange} />
  );

  fireEvent.change(getByPlaceholderText('Detail alamat'), { target: { value: 'Jalan Merdeka' } });
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('meneruskan ref dan props tambahan ke elemen textarea', () => {
  const ref = React.createRef();
  const { getByPlaceholderText } = render(
    <Textarea placeholder="Detail alamat" name="detail_alamat" ref={ref} />
  );

  expect(ref.current.tagName).toBe('TEXTAREA');
  expect(getByPlaceholderText('Detail alamat')).toHaveAttribute('name', 'detail_alamat');
});
