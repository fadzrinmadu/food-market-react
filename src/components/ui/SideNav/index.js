import * as React from 'react';
import { arrayOf, func, node, oneOf, oneOfType, shape, string, number } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor, getTextColor } from '../utils/colors';

const verticalAlignClasses = {
  top: 'md:justify-start',
  middle: 'md:justify-center',
  bottom: 'md:justify-end',
};

// Strip navigasi kini bersurface putih netral (bukan panel bg warna solid
// setinggi layar) mengikuti gaya referensi; item aktif ditandai lewat pill
// gelap kecil (default `color="black"`), bukan lagi warna brand penuh satu
// panel.
function getItemClasses(isActive, color) {
  return classNames(
    'text-center my-1 mx-2 py-3 rounded-xl text-xs font-medium cursor-pointer transition-colors',
    isActive
      ? classNames(getBgColor(color), getTextColor('white'))
      : classNames(getTextColor('gray', 600), 'hover:bg-gray-100')
  );
}

export default function SideNav({ items = [], active, color = 'black', verticalAlign = 'middle', onChange }) {
  const navClasses = classNames(
    'bg-white',
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
            className={getItemClasses(isActive, color)}
            onClick={isInteractive ? () => onChange(item.id) : undefined}
            onKeyDown={isInteractive ? event => handleKeyDown(event, item.id) : undefined}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Ikon dibungkus chip gelap: aset ikon menu project ini berupa
                PNG putih polos (dibuat utk latar warna solid lama), jadi
                perlu latar kontras sendiri supaya tetap terlihat di atas
                nav yang kini bersurface putih. */}
            <div
              className="w-10 h-10 mx-auto rounded-full bg-gray-800 text-white flex items-center justify-center mb-1"
              aria-hidden="true"
            >
              {typeof item.icon === 'string' ? (
                <img src={item.icon} alt="" className="w-5 h-5" />
              ) : (
                <div className="text-lg flex">{item.icon}</div>
              )}
            </div>
            <div>{item.label}</div>
          </div>
        );
      })}
    </nav>
  );
}

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
  /** warna indikator item aktif */
  color: oneOf(colors),
  verticalAlign: oneOf(Object.keys(verticalAlignClasses)),
  /** dipanggil saat menu diklik, menerima `id` menu */
  onChange: func,
};
