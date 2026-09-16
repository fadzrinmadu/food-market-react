import * as React from 'react';
import { func, number, oneOf, oneOfType, string } from 'prop-types';

import InputNumber from '../InputNumber';
import { classNames } from '../utils/class-names';
import { colors, getBgColor, getTextColor } from '../utils/colors';

export default function CardItem({ name, imgUrl, qty, color = 'red', onInc = () => null, onDec = () => null }) {
  const cardClasses = classNames(
    getBgColor(color, 400),
    getTextColor(color, 900),
    'flex',
    'p-2',
    'rounded'
  );

  return (
    <div className={cardClasses}>
      <div>
        <img src={imgUrl} alt={name} className="w-20" />
      </div>
      <div className="ml-5">
        <div className="mb-2">{name}</div>
        <div>
          <InputNumber size="small" value={qty} onInc={onInc} onDec={onDec} />
        </div>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  /** nama item */
  name: string.isRequired,
  /** url gambar item */
  imgUrl: string.isRequired,
  /** jumlah item */
  qty: oneOfType([string, number]).isRequired,
  /** warna kartu */
  color: oneOf(colors),
  /** dipanggil saat tombol + diklik */
  onInc: func,
  /** dipanggil saat tombol - diklik */
  onDec: func,
};
