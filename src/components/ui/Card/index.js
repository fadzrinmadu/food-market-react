import * as React from 'react';
import { func, node, oneOf } from 'prop-types';

import { classNames } from '../utils/class-names';
import { colors, getBgColor } from '../utils/colors';

// Default kartu kini bersurface putih netral (bukan bg warna solid penuh)
// mengikuti gaya referensi: kartu "mengambang" di atas latar krem lewat
// shadow lembut, nyaris tanpa border. `color` lain (mis. `orange`) tetap
// bisa dipakai untuk kartu aksen bg solid seperti sebelumnya (masih
// diberi border putih tipis sebagai ring, konsisten dgn perilaku lama).
export default function Card({ header, body, footer, color = 'white', onClick, children }) {
  const isFilled = color !== 'white';

  const cardClasses = classNames(
    getBgColor(color),
    onClick && 'cursor-pointer',
    'shadow-lg',
    'rounded-lg',
    'p-6',
    isFilled && 'border border-white'
  );

  const handleKeyDown = event => {
    if (!onClick) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onClick(event);
  };

  return (
    <div className="w-full">
      <div
        className={cardClasses}
        onClick={onClick}
        onKeyDown={onClick ? handleKeyDown : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div>{header}</div>
        <div>{body || children}</div>
        <div>{footer}</div>
      </div>
    </div>
  );
}

Card.propTypes = {
  /** bagian atas kartu */
  header: node,
  /** isi kartu; alternatif dari `children` */
  body: node,
  /** bagian bawah kartu */
  footer: node,
  /** warna background kartu */
  color: oneOf(colors),
  onClick: func,
  children: node,
};
