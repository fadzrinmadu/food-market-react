import * as React from 'react';
import { func, string } from 'prop-types';
import FaExclamationCircle from '@meronex/icons/fa/FaExclamationCircle';

import Button from '../Button';
import Text from '../Text';

/**
 * Tampilan standar saat pengambilan data gagal, supaya bisa dibedakan dari
 * empty state (data memang kosong) dan menawarkan opsi coba lagi.
 */
export default function ErrorState({ message = 'Terjadi kesalahan saat memuat data.', onRetry }) {
  return (
    <div className="text-center py-10" role="alert">
      <div className="text-5xl text-red-600 flex justify-center mb-4" aria-hidden="true">
        <FaExclamationCircle />
      </div>
      <Text as="h5">{message}</Text>
      {onRetry ? (
        <div className="mt-4">
          <Button color="gray" onClick={onRetry}>
            Coba lagi
          </Button>
        </div>
      ) : null}
    </div>
  );
}

ErrorState.propTypes = {
  /** pesan error yang ditampilkan */
  message: string,
  /** dipanggil saat tombol "Coba lagi" diklik; sembunyikan tombol jika kosong */
  onRetry: func,
};
