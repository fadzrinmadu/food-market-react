import * as React from 'react';
import { node, number, string } from 'prop-types';

import { classNames } from '../utils/class-names';

function getWidthClass(breakpoint) {
  if (breakpoint >= 2 && breakpoint <= 6) return `w-1/${breakpoint}`;
  return 'w-full';
}

/**
 * Catatan: hanya kata kunci `flex` yang diberi prefix breakpoint, sedangkan
 * `flex-wrap` sengaja dibiarkan tanpa prefix. Ini meniru persis perilaku
 * `upkit` agar layout yang sudah berjalan tidak berubah.
 */
function getFlexClass(breakpoint, prefix = '') {
  if (!breakpoint || breakpoint === 1) return '';
  return `${prefix}flex flex-wrap`;
}

export default function Responsive({
  children,
  desktop = 3,
  tablet = 2,
  mobile = 1,
  justify = '',
  items = 'center',
}) {
  const gridClasses = classNames(
    getFlexClass(mobile),
    getFlexClass(tablet, 'md:'),
    getFlexClass(desktop, 'lg:'),
    justify && `justify-${justify}`,
    items && `items-${items}`
  );

  const columnClasses = classNames(
    getWidthClass(mobile),
    `md:${getWidthClass(tablet)}`,
    `lg:${getWidthClass(desktop)}`
  );

  const columns = React.Children.toArray(children);

  return (
    <div className={gridClasses}>
      {columns.length > 1 ? (
        columns.map((child, index) => (
          <div key={index} className={columnClasses}>
            {child}
          </div>
        ))
      ) : (
        <div className={columnClasses}>{children}</div>
      )}
    </div>
  );
}

Responsive.propTypes = {
  /** jumlah kolom di layar desktop */
  desktop: number,
  /** jumlah kolom di layar tablet */
  tablet: number,
  /** jumlah kolom di layar mobile */
  mobile: number,
  /** nilai untuk class `justify-*` */
  justify: string,
  /** nilai untuk class `items-*` */
  items: string,
  children: node,
};
