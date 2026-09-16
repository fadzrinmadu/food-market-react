import * as React from 'react';
import { number, oneOfType, string } from 'prop-types';

import { classNames } from '../utils/class-names';

export default function Skeleton({ width = '100%', height = '1rem', rounded = 'rounded', className }) {
  const skeletonClasses = classNames(
    'bg-gray-300 animate-pulse',
    rounded,
    className
  );

  return (
    <div
      className={skeletonClasses}
      style={{ width, height }}
    />
  );
}

Skeleton.propTypes = {
  /** lebar skeleton, contoh: '100%', '3rem', 120 */
  width: oneOfType([string, number]),
  /** tinggi skeleton, contoh: '1rem', '3rem', 24 */
  height: oneOfType([string, number]),
  /** class border-radius tailwind, contoh: 'rounded-full' */
  rounded: string,
  /** class tambahan */
  className: string,
};
