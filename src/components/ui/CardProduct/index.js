import * as React from 'react';
import { func, number, oneOf, oneOfType, string } from 'prop-types';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';

import Card from '../Card';
import Text from '../Text';
import { classNames } from '../utils/class-names';
import { colors, getTextColor } from '../utils/colors';

/**
 * Format harga produk.
 *
 * Sengaja memakai `maximumSignificantDigits: 3` seperti komponen aslinya, bukan
 * `formatRupiah` milik project yang memakai 2, agar angka yang tampil di katalog
 * tidak berubah.
 */
function toRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    currency: 'IDR',
    style: 'currency',
    maximumSignificantDigits: 3,
  }).format(number);
}

export default function CardProduct({ title, imgUrl, price, color, onAddToCart }) {
  const addToCartClasses = classNames(
    'px-2 py-2 ml-2 inline-block self-end rounded',
    getTextColor(color),
    'cursor-pointer text-center hover:bg-white bg-gray-100 shadow-sm'
  );

  const handleKeyDown = event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onAddToCart(event);
  };

  return (
    <Card
      color={color}
      header={<div />}
      body={
        <div className="flex justify-between">
          {/* slot kosong; menjaga gambar tetap rata kanan karena `justify-between` */}
          <div />
          <div>
            <img className="h-24" src={imgUrl} alt={title} />
          </div>
        </div>
      }
      footer={
        <div className="flex justify-between items-end">
          <div>
            <Text as="h5" color="white">
              {title}
            </Text>
            <Text as="small" color="white" />
          </div>
          <div className="flex items-center">
            <Text as="h6" color="white">
              {toRupiah(price)}
            </Text>
            <div
              className={addToCartClasses}
              onClick={onAddToCart}
              onKeyDown={handleKeyDown}
              role="button"
              tabIndex={0}
              aria-label={`Tambah ${title} ke keranjang`}
            >
              <FaCartPlus className="mx-auto" />
            </div>
          </div>
        </div>
      }
    />
  );
}

CardProduct.defaultProps = {
  onAddToCart: () => null,
};

CardProduct.propTypes = {
  /** nama produk */
  title: string,
  /** url gambar produk */
  imgUrl: string,
  /** harga produk */
  price: oneOfType([string, number]),
  /** warna kartu */
  color: oneOf(colors),
  /** dipanggil saat tombol tambah ke keranjang diklik */
  onAddToCart: func,
};
