import * as React from 'react';
import { node, oneOf, bool, string } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getTextColor } from '../utils/colors';

// Heading memakai bobot tebal secara default (extrabold utk h1/h2, bold utk
// h3/h4, semibold utk h5/h6) mengikuti gaya referensi; `bold` tetap bisa
// dipakai utk menebalkan varian non-heading (mis. `body`/`small`).
const variantClasses = {
  h1: 'text-5xl font-extrabold',
  h2: 'text-4xl font-extrabold',
  h3: 'text-3xl font-bold',
  h4: 'text-2xl font-bold',
  h5: 'text-xl font-semibold',
  h6: 'font-semibold',
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
