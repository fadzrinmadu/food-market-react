import * as React from 'react';
import { bool, func, node, oneOf, string } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor, getBgColorHover } from '../utils/colors';

const buttonSizes = {
  small: 'h-6 text-sm',
  medium: 'h-8',
  large: 'h-10 text-xl',
};

export default function Button({
  text,
  iconBefore,
  iconAfter,
  onClick,
  color,
  size,
  fitContainer,
  disabled,
  children,
  ...props
}) {
  const buttonClasses = classNames(
    buttonSizes[size],
    disabled
      ? `cursor-not-allowed ${getBgColor(color, 300)} ${getBgColorHover(color, 300)}`
      : `${getBgColor(color)} ${getBgColorHover(color)}`,
    fitContainer && 'w-full',
    'inline-flex',
    'items-center',
    'justify-center',
    'px-4',
    'text-white',
    'rounded',
    'shadow-lg',
    'border',
    'border-white'
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
  /** lebarkan tombol selebar container */
  fitContainer: bool,
  disabled: bool,
  children: node,
};
