import * as React from 'react';
import { node, oneOf, bool } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getTextColor } from '../utils/colors';

const variantClasses = {
  h1: 'text-5xl',
  h2: 'text-4xl',
  h3: 'text-3xl',
  h4: 'text-2xl',
  h5: 'text-xl',
  h6: '',
  info: 'text-blue-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  body: '',
  small: 'text-sm',
};

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export default function Text({ as, color, bold, children }) {
  const Tag = headingTags.includes(as) ? as : 'div';

  return (
    <Tag className={classNames(variantClasses[as], getTextColor(color), bold && 'font-bold')}>
      {children}
    </Tag>
  );
}

Text.defaultProps = {
  as: 'body',
  color: 'black',
  bold: false,
};

Text.propTypes = {
  /** varian ukuran atau makna teks */
  as: oneOf(Object.keys(variantClasses)),
  /** warna teks */
  color: oneOf(colors),
  /** tebalkan teks */
  bold: bool,
  children: node,
};
