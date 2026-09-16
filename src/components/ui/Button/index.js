import * as React from 'react';
import { bool, func, node, oneOf, string } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor, getBgColorHover, getBorderColor, getTextColor } from '../utils/colors';
import { focusRingClasses } from '../utils/a11y';

const buttonSizes = {
  small: 'h-6 text-sm',
  medium: 'h-8',
  large: 'h-10 text-xl',
};

const buttonVariants = ['solid', 'outline'];

export default function Button({
  text,
  iconBefore,
  iconAfter,
  onClick,
  color,
  size,
  variant,
  fitContainer,
  disabled,
  children,
  ...props
}) {
  const isOutline = variant === 'outline';

  const colorClasses = disabled
    ? 'bg-gray-200 text-gray-500 border-gray-200'
    : isOutline
    ? classNames('bg-white', getTextColor(color), getBorderColor(color), getBgColorHover(color), 'hover:text-white')
    : classNames(getBgColor(color), getBgColorHover(color), 'text-white', 'border-white');

  const buttonClasses = classNames(
    buttonSizes[size],
    disabled && 'cursor-not-allowed',
    colorClasses,
    fitContainer && 'w-full',
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'rounded',
    'shadow-lg',
    'border',
    focusRingClasses
  );

  return (
    <button {...props} className={buttonClasses} onClick={onClick} disabled={disabled}>
      {iconBefore ? (
        <div className="mr-2" aria-hidden="true">
          {iconBefore}
        </div>
      ) : null}
      <div>{text || children}</div>
      {iconAfter ? (
        <div className="ml-2" aria-hidden="true">
          {iconAfter}
        </div>
      ) : null}
    </button>
  );
}

Button.defaultProps = {
  color: 'red',
  size: 'medium',
  variant: 'solid',
  fitContainer: false,
};

Button.propTypes = {
  /** label tombol; alternatif dari `children` */
  text: string,
  /** ikon di sebelah kiri label */
  iconBefore: node,
  /** ikon di sebelah kanan label */
  iconAfter: node,
  onClick: func,
  /** warna tombol, mengikuti palet Tailwind project */
  color: oneOf(colors),
  size: oneOf(Object.keys(buttonSizes)),
  /** gaya tombol: `solid` (default, aksi utama) atau `outline` (aksi sekunder/destruktif) */
  variant: oneOf(buttonVariants),
  /** lebarkan tombol selebar container */
  fitContainer: bool,
  disabled: bool,
  children: node,
};
