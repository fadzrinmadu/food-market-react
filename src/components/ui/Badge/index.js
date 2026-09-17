import * as React from 'react';
import { node, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor, getTextColor } from '../utils/colors';

export default function Badge({ color = 'orange', children }) {
  const badgeClasses = classNames(
    getBgColor(color, 200),
    getTextColor(color, 900),
    'inline-flex',
    'justify-center',
    'items-center',
    'px-3',
    'py-1',
    'text-sm',
    'font-medium',
    'rounded-full'
  );

  return <div className={badgeClasses}>{children}</div>;
}

Badge.propTypes = {
  /** warna badge, mengikuti palet Tailwind project */
  color: oneOf(colors),
  children: node,
};
