import * as React from 'react';
import { func, oneOfType, number, string } from 'prop-types';

import InputText from '../InputText';

const InputPassword = React.forwardRef(function InputPassword(
  { value, onChange = () => null, placeholder, ...props },
  ref
) {
  return (
    <InputText
      {...props}
      type="password"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

InputPassword.propTypes = {
  value: oneOfType([string, number]),
  onChange: func,
  placeholder: string,
};

export default InputPassword;
