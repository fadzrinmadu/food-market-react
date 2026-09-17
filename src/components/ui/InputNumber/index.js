import * as React from 'react';
import { bool, func, number, oneOf, oneOfType, string } from 'prop-types';

import ButtonCircle from '../ButtonCircle';
import { classNames } from '../utils/class-names';
import { colors } from '../utils/colors';

const inputSizes = {
  small: 'w-8',
  medium: 'w-16',
  large: 'w-20',
};

const InputNumber = React.forwardRef(function InputNumber(
  {
    value,
    onInc,
    onDec,
    onSetValue = () => null,
    textColor = 'white',
    buttonColor = 'orange',
    size = 'medium',
    fullRound = false,
    ...props
  },
  ref
) {
  const roundedClass = fullRound ? 'rounded-full' : 'rounded';

  const wrapperClasses = classNames('border', 'inline-flex', roundedClass, 'py-1', 'px-2');

  const inputClasses = classNames(
    'px-2',
    inputSizes[size],
    roundedClass,
    'text-center',
    'bg-transparent'
  );

  const handleChange = event => onSetValue(parseInt(event.target.value, 10));

  return (
    <div className={wrapperClasses}>
      <ButtonCircle
        icon="-"
        size={size}
        textColor={textColor}
        color={buttonColor}
        onClick={onDec}
        aria-label="Kurangi jumlah"
      />
      <input
        {...props}
        type="text"
        value={value}
        className={inputClasses}
        onChange={handleChange}
        ref={ref}
      />
      <ButtonCircle
        icon="+"
        size={size}
        textColor={textColor}
        color={buttonColor}
        onClick={onInc}
        aria-label="Tambah jumlah"
      />
    </div>
  );
});

InputNumber.propTypes = {
  value: oneOfType([string, number]),
  /** dipanggil saat tombol + diklik */
  onInc: func,
  /** dipanggil saat tombol - diklik */
  onDec: func,
  /** dipanggil saat nilai diketik langsung di input */
  onSetValue: func,
  /** warna isi tombol + dan - */
  textColor: oneOf(colors),
  /** warna background tombol + dan - */
  buttonColor: oneOf(colors),
  size: oneOf(Object.keys(inputSizes)),
  fullRound: bool,
};

export default InputNumber;
