import React from 'react';
import { render } from '@testing-library/react';

import InputPassword from './index';

test('merender input bertipe password', () => {
  const { getByPlaceholderText } = render(<InputPassword placeholder="password" />);
  const input = getByPlaceholderText('password');

  expect(input).toHaveAttribute('type', 'password');
  expect(input.parentElement.className).toBe('inline-flex py-2 pl-5 pr-3 border rounded');
});

test('meneruskan props tambahan dan ref ke elemen input', () => {
  const ref = React.createRef();
  const { getByPlaceholderText } = render(
    <InputPassword placeholder="password" name="password" fitContainer ref={ref} />
  );

  expect(getByPlaceholderText('password')).toHaveAttribute('name', 'password');
  expect(ref.current.tagName).toBe('INPUT');
  expect(ref.current.parentElement.className).toContain('flex');
});
