import * as React from 'react';
import { node, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';

const widthClasses = {
  full: '',
  large: 'w-full md:w-4/5 max-w-4xl',
  medium: 'w-full md:w-3/5 max-w-md',
  small: 'w-full md:w-1/3 max-w-sm',
};

export default function LayoutOne({ size, children }) {
  return (
    <div className={classNames('mx-auto', 'px-2 sm:px-0', widthClasses[size])}>{children}</div>
  );
}

LayoutOne.defaultProps = {
  size: 'large',
};

LayoutOne.propTypes = {
  /** lebar area konten */
  size: oneOf(Object.keys(widthClasses)),
  children: node,
};
