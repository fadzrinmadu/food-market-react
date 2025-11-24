import * as React from 'react';
import { func, node, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor, getBgColorHover, getTextColor } from '../utils/colors';

const buttonSizes = {
  small: 'w-6 h-6',
  medium: 'w-8 h-8',
  large: 'w-10 h-10 text-lg',
};

const buttonStyles = {
  small: { width: '1.7rem', height: '1.7rem' },
  medium: {},
  large: {},
};

export default function ButtonCircle({ icon, onClick, size, color, textColor, ...props }) {
  const buttonClasses = classNames(
    buttonSizes[size],
    getBgColor(color),
    getBgColorHover(color),
    getTextColor(textColor),
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'shadow-lg',
    'border-2',
    'leading-none',
    'border-white'
  );

  return (
    <button {...props} onClick={onClick} className={buttonClasses} style={buttonStyles[size]}>
      {icon}
    </button>
  );
}

ButtonCircle.defaultProps = {
  size: 'medium',
  color: 'red',
  textColor: 'white',
};

ButtonCircle.propTypes = {
  /** isi tombol, biasanya berupa ikon */
  icon: node,
  onClick: func,
  size: oneOf(Object.keys(buttonSizes)),
  /** warna background tombol */
  color: oneOf(colors),
  /** warna isi tombol */
  textColor: oneOf(colors),
};
