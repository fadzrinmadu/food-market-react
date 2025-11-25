import * as React from 'react';
import { arrayOf, func, node, oneOf, oneOfType, shape, string, number } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor } from '../utils/colors';

const verticalAlignClasses = {
  top: 'md:justify-start',
  middle: 'md:justify-center',
  bottom: 'md:justify-end',
};

const baseItemClasses = 'text-center my-2 text-sm text-white cursor-pointer';

export default function SideNav({ items, active, color, verticalAlign, onChange }) {
  const navClasses = classNames(
    getBgColor(color),
    'h-full',
    'min-h-screen',
    'justify-start',
    verticalAlignClasses[verticalAlign] || verticalAlignClasses.middle,
    'w-20',
    'py-5',
    'items-stretch',
    'flex',
    'flex-col'
  );

  const isInteractive = typeof onChange === 'function';

  const handleKeyDown = (event, id) => {
    if (!isInteractive) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onChange(id);
  };

  return (
    <nav className={navClasses}>
      {items.map((item, index) => {
        const isActive = active === (item.id === undefined || item.id === null ? item.id : item.id.toString());

        return (
          <div
            key={index}
            className={classNames(baseItemClasses, isActive && getBgColor(color, 700))}
            onClick={isInteractive ? () => onChange(item.id) : undefined}
            onKeyDown={isInteractive ? event => handleKeyDown(event, item.id) : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            {typeof item.icon === 'string' ? (
              <img src={item.icon} alt="" className="mx-auto" />
            ) : (
              <div className="text-4xl flex justify-center text-center mx-auto" aria-hidden="true">
                {item.icon}
              </div>
            )}
            {item.label}
          </div>
        );
      })}
    </nav>
  );
}

SideNav.defaultProps = {
  items: [],
  verticalAlign: 'middle',
};

SideNav.propTypes = {
  /** daftar menu yang ingin ditampilkan */
  items: arrayOf(
    shape({
      label: string.isRequired,
      icon: oneOfType([string, node]).isRequired,
      id: oneOfType([string, number]).isRequired,
    })
  ),
  /** `id` menu yang sedang aktif */
  active: string,
  /** warna background sidebar */
  color: oneOf(colors),
  verticalAlign: oneOf(Object.keys(verticalAlignClasses)),
  /** dipanggil saat menu diklik, menerima `id` menu */
  onChange: func,
};
