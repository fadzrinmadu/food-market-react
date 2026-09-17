import * as React from 'react';
import { func, number, oneOf, oneOfType, string } from 'prop-types';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';

import Card from '../Card';
import ButtonCircle from '../ButtonCircle';
import Text from '../Text';
import { colors } from '../utils/colors';

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

export default function CardProduct({ title, imgUrl, price, color = 'orange', onAddToCart = () => null }) {
  return (
    <Card
      body={
        <div>
          <div className="bg-gray-100 rounded-md h-32 mb-4 flex items-center justify-center overflow-hidden">
            <img className="h-24 object-contain" src={imgUrl} alt={title} />
          </div>
          <div className="flex justify-between items-end">
            <div className="pr-2">
              <Text as="h6" className="mb-1">
                {title}
              </Text>
              <Text as="small" color={color} bold>
                {toRupiah(price)}
              </Text>
            </div>
            <ButtonCircle
              icon={<FaCartPlus />}
              size="small"
              color={color}
              onClick={onAddToCart}
              aria-label={`Tambah ${title} ke keranjang`}
            />
          </div>
        </div>
      }
    />
  );
}

CardProduct.propTypes = {
  /** nama produk */
  title: string,
  /** url gambar produk */
  imgUrl: string,
  /** harga produk */
  price: oneOfType([string, number]),
  /** warna aksen (harga & tombol tambah ke keranjang) */
  color: oneOf(colors),
  /** dipanggil saat tombol tambah ke keranjang diklik */
  onAddToCart: func,
};
