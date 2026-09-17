import * as React from 'react';
import { func, node, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor, getBgColorHover, getTextColor } from '../utils/colors';

// Ukuran dinaikkan agar `medium` (bawaan) memenuhi target sentuh minimal
// 44px (WCAG); `small` tetap lebih kecil untuk konteks padat/opsional.
const buttonSizes = {
  small: 'w-8 h-8',
  medium: 'w-11 h-11',
  large: 'w-12 h-12 text-lg',
};

export default function ButtonCircle({ icon, onClick, size = 'medium', color = 'orange', textColor = 'white', ...props }) {
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
    <button {...props} onClick={onClick} className={buttonClasses}>
      {icon}
    </button>
  );
}

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
