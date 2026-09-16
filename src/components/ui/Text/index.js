import * as React from 'react';
import { node, oneOf, bool, string } from 'prop-types';

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

/** Varian yang sudah punya warna sendiri; `color` diabaikan kecuali disetel eksplisit. */
const semanticColorVariants = ['info', 'warning', 'error'];

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const DEFAULT_COLOR = 'black';

export default function Text({ as = 'body', color = DEFAULT_COLOR, bold = false, className, children }) {
  const Tag = headingTags.includes(as) ? as : 'div';

  const hasImpliedColor = semanticColorVariants.includes(as) && color === DEFAULT_COLOR;
  const colorClass = hasImpliedColor ? null : getTextColor(color);

  return (
    <Tag className={classNames(variantClasses[as], colorClass, bold && 'font-bold', className)}>
      {children}
    </Tag>
  );
}

Text.propTypes = {
  /** varian ukuran atau makna teks */
  as: oneOf(Object.keys(variantClasses)),
  /** warna teks; diabaikan untuk varian `info`/`warning`/`error` kecuali disetel eksplisit */
  color: oneOf(colors),
  /** tebalkan teks */
  bold: bool,
  /** class Tailwind tambahan, mis. untuk spacing (`mb-6`) */
  className: string,
  children: node,
};
